/**
 * ======================================================
 * Automatic Daily Statistics Scheduler Service
 * ======================================================
 * الوصف:
 *   خدمة تعمل في الخلفية لحساب وحفظ الإحصائيات اليومية تلقائياً
 * 
 * الوظيفة:
 *   - حساب الإحصائيات اليومية تلقائياً في نهاية كل يوم
 *   - مقارنة مع اليوم السابق
 *   - حفظ النتائج في قاعدة البيانات
 *   - إرسال إشعارات في حال وجود انحرافات كبيرة
 * 
 * المواعيد:
 *   - يتم تشغيل الحساب في الساعة 23:59 كل يوم
 *   - يتم حساب الإحصائيات لليوم الحالي
 * 
 * @version 1.0.0
 */

import { PrismaClient } from '@prisma/client';
import { scheduleJob } from 'node-schedule';

const prisma = new PrismaClient();
const PORT = 3020;

/**
 * دالة مساعدة للحصول على بداية ونهاية اليوم
 */
function getDayRange(date: Date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

/**
 * دالة مساعدة للحصول على بداية ونهاية اليوم السابق
 */
function getPreviousDayRange(date: Date) {
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);
  return getDayRange(yesterday);
}

/**
 * دالة مساعدة للحصول على رقم الأسبوع (ISO)
 */
function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

/**
 * دالة حساب النسبة المئوية للتغيير
 */
function calculateChange(current: number, previous: number): number | null {
  if (previous === 0) {
    return current > 0 ? 100 : null;
  }
  return ((current - previous) / previous) * 100;
}

/**
 * الدالة الرئيسية لحساب وحفظ الإحصائيات اليومية
 */
async function calculateAndSaveDailyStats(targetDate?: Date) {
  try {
    const date = targetDate || new Date();
    const { start, end } = getDayRange(date);
    const { start: prevStart, end: prevEnd } = getPreviousDayRange(date);

    console.log(`[${new Date().toISOString()}] 📊 Calculating stats for: ${date.toISOString().split('T')[0]}`);

    // جلب جميع البيانات من اليوم
    const [violations, permits, reports, nearMisses, tbts, settings, previousDayStats] = await Promise.all([
      prisma.violation.findMany({
        where: { date: { gte: start, lte: end } },
      }),

      prisma.permit.findMany({
        where: { date: { gte: start, lte: end } },
      }),

      prisma.inspectionReport.findMany({
        where: { date: { gte: start, lte: end } },
      }),

      prisma.nearMiss.findMany({
        where: { date: { gte: start, lte: end } },
      }),

      prisma.tBT.findMany({
        where: { date: { gte: start, lte: end } },
      }),

      prisma.hSESettings.findFirst(),

      prisma.dailyStats.findFirst({
        where: {
          date: {
            gte: prevStart,
            lte: prevEnd,
          },
        },
      }),
    ]);

    // حساب إحصائيات المخالفات
    const criticalViolations = violations.filter(v => v.severity === 'critical').length;
    const majorViolations = violations.filter(v => v.severity === 'major').length;
    const minorViolations = violations.filter(v => v.severity === 'minor').length;
    const openViolations = violations.filter(v => v.status === 'open').length;
    const closedViolations = violations.filter(v => v.status === 'closed').length;

    // حساب إحصائيات التصاريح
    const pendingPermits = permits.filter(p => p.status === 'pending').length;
    const approvedPermits = permits.filter(p => p.status === 'approved').length;
    const rejectedPermits = permits.filter(p => p.status === 'rejected').length;
    const expiredPermits = permits.filter(p => p.status === 'expired').length;

    // حساب إحصائيات التقارير
    const completedInspections = reports.filter(r => r.status === 'completed').length;
    const averageScore = reports.length > 0
      ? reports.reduce((sum, r) => sum + r.score, 0) / reports.length
      : 0;
    const complianceRate = reports.length > 0
      ? reports.reduce((sum, r) => sum + (r.complianceRate || 0), 0) / reports.length
      : 0;
    const failedItems = reports.reduce((sum, r) => sum + (r.failedItems || 0), 0);
    const passedItems = reports.reduce((sum, r) => sum + (r.passedItems || 0), 0);

    // حساب إحصائيات الحوادث الوشيكة
    const openNearMisses = nearMisses.filter(n => n.status === 'open').length;
    const resolvedNearMisses = nearMisses.filter(n => n.resolved).length;
    const highSeverityNearMisses = nearMisses.filter(n => n.severity === 'high').length;
    const mediumSeverityNearMisses = nearMisses.filter(n => n.severity === 'medium').length;
    const lowSeverityNearMisses = nearMisses.filter(n => n.severity === 'low').length;

    // حساب إحصائيات TBT
    const totalAttendees = tbts.reduce((sum, t) => {
      const attendees = t.attendees ? t.attendees.split(',').length : 0;
      return sum + attendees;
    }, 0);
    const averageDuration = tbts.length > 0
      ? tbts.reduce((sum, t) => sum + (t.duration || 0), 0) / tbts.length
      : 0;

    // حساب الساعات الآمنة
    const dailyWorkHours = settings?.dailyWorkHours || 8;
    const totalWorkers = settings?.totalWorkers || 10;
    const safeManHours = dailyWorkHours * totalWorkers;

    // حساب معدل الحوادث
    const totalIncidents = violations.length + nearMisses.length;
    const incidentRate = safeManHours > 0 ? (totalIncidents / safeManHours) * 200000 : 0;

    // حساب التغييرات بالنسبة المئوية من اليوم السابق
    const violationsChange = previousDayStats
      ? calculateChange(violations.length, previousDayStats.totalViolations)
      : null;
    const permitsChange = previousDayStats
      ? calculateChange(permits.length, previousDayStats.totalPermits)
      : null;
    const inspectionsChange = previousDayStats
      ? calculateChange(reports.length, previousDayStats.totalInspections)
      : null;
    const nearMissesChange = previousDayStats
      ? calculateChange(nearMisses.length, previousDayStats.totalNearMisses)
      : null;

    // إعداد بيانات الإحصائيات
    const statsData = {
      date: start,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      dayOfWeek: date.getDay(),
      weekNumber: getWeekNumber(date),

      totalViolations: violations.length,
      openViolations,
      closedViolations,
      criticalViolations,
      majorViolations,
      minorViolations,

      totalPermits: permits.length,
      pendingPermits,
      approvedPermits,
      rejectedPermits,
      expiredPermits,

      totalInspections: reports.length,
      completedInspections,
      averageScore,
      complianceRate,
      failedItems,
      passedItems,

      totalNearMisses: nearMisses.length,
      openNearMisses,
      resolvedNearMisses,
      highSeverityNearMisses,
      mediumSeverityNearMisses,
      lowSeverityNearMisses,

      totalTBTs: tbts.length,
      totalAttendees,
      averageDuration,

      safeManHours,
      cumulativeSafeHours: settings?.safeHours || 0,
      incidentRate,

      violationsChange,
      permitsChange,
      inspectionsChange,
      nearMissesChange,

      recordedBy: 'stats-scheduler',
    };

    // التحقق من وجود إحصائيات لهذا اليوم
    const existingStats = await prisma.dailyStats.findFirst({
      where: {
        date: {
          gte: start,
          lte: end,
        },
      },
    });

    let savedStats;

    if (existingStats) {
      savedStats = await prisma.dailyStats.update({
        where: { id: existingStats.id },
        data: statsData,
      });

      console.log(`[${new Date().toISOString()}] ✅ Updated stats for date: ${date.toISOString().split('T')[0]}`);
    } else {
      savedStats = await prisma.dailyStats.create({
        data: statsData,
      });

      console.log(`[${new Date().toISOString()}] ✅ Created new stats for date: ${date.toISOString().split('T')[0]}`);
    }

    return savedStats;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] ❌ Error calculating stats:`, error);
    throw error;
  }
}

/**
 * بدء خادم التعبئة
 */
function startScheduler() {
  console.log(`[${new Date().toISOString()}] 🚀 Stats Scheduler Service starting on port ${PORT}`);
  console.log(`[${new Date().toISOString()}] 📅 Scheduled to run daily at 23:59`);

  // جدولة الحساب اليومي في الساعة 23:59
  scheduleJob('0 59 23 * * *', async () => {
    try {
      console.log(`[${new Date().toISOString()}] ⏰ Running scheduled daily stats calculation...`);
      await calculateAndSaveDailyStats();
    } catch (error) {
      console.error(`[${new Date().toISOString()}] ❌ Scheduled task failed:`, error);
    }
  });

  // تشغيل الحساب فوراً عند البدء (للاختبار)
  console.log(`[${new Date().toISOString()}] 📊 Running initial stats calculation...`);
  calculateAndSaveDailyStats().catch(error => {
    console.error(`[${new Date().toISOString()}] ❌ Initial calculation failed:`, error);
  });

  console.log(`[${new Date().toISOString()}] ✅ Stats Scheduler Service is running`);
}

// بدء الخدمة
startScheduler();

// معالجة إغلاق التطبيق بشكل أنيق
process.on('SIGINT', () => {
  console.log(`[${new Date().toISOString()}] 🛑 Shutting down Stats Scheduler Service...`);
  prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log(`[${new Date().toISOString()}] 🛑 Shutting down Stats Scheduler Service...`);
  prisma.$disconnect();
  process.exit(0);
});
