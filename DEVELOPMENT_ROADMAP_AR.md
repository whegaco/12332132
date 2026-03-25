# 🚀 خطة التطوير الشاملة - SafetyPro HSE Enterprise

## 📋 جدول المحتويات
1. [نظرة عامة](#نظرة-عامة)
2. [الهيكل الحالي للمشروع](#الهيكل-الحالي-للمشروع)
3. [الوضع الحالي](#الوضع-الحالي)
4. [خارطة الطريق للتطوير](#خارطة-الطريق-للتطوير)
5. [أفضل الممارسات](#أفضل-الممارسات)
6. [دليل التطوير](#دليل-التطوير)
7. [التحسينات المستقبلية](#التحسينات-المستقبلية)

---

## 📌 نظرة عامة

**SafetyPro HSE Enterprise** هو نظام متكامل لإدارة الصحة والسلامة المهنية مبني على أحدث التقنيات:

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui
- **Database**: SQLite مع Prisma ORM
- **State Management**: React Hooks
- **Notifications**: Sonner Toast
- **Language**: العربية (RTL) مع دعم كامل

---

## 🏗️ الهيكل الحالي للمشروع

```
my-project/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/hse/                  # API Routes
│   │   │   ├── settings/             # إعدادات النظام
│   │   │   ├── violations/           # إدارة المخالفات
│   │   │   ├── permits/              # تصاريح العمل
│   │   │   ├── reports/              # تقارير التفتيش
│   │   │   ├── tbts/                 # اجتماعات TBT
│   │   │   └── nearmisses/           # الحوادث الوشيكة
│   │   ├── layout.tsx                # Layout الرئيسي مع دعم RTL
│   │   ├── page.tsx                  # الصفحة الرئيسية (المنسق الرئيسي)
│   │   └── globals.css               # الأنماط العامة
│   │
│   ├── components/                   # المكونات المشتركة
│   │   ├── Header.tsx                # رأس التطبيق
│   │   ├── BottomNav.tsx            # شريط التنقل السفلي
│   │   ├── MenuSheet.tsx            # قائمة الجانبية
│   │   └── ui/                      # مكونات shadcn/ui
│   │
│   ├── features/                     # الوحدات الوظيفية
│   │   ├── dashboard/               # لوحة التحكم
│   │   ├── violations/              # إدارة المخالفات
│   │   ├── permits/                 # تصاريح العمل
│   │   ├── inspection/              # نظام التفتيش
│   │   ├── tbt/                     # اجتماعات TBT
│   │   ├── near-miss/               # الحوادث الوشيكة
│   │   ├── coshh/                   # دليل المواد الخطرة
│   │   ├── reports/                 # أرشيف التقارير
│   │   └── settings/                # الإعدادات
│   │
│   ├── hooks/                        # Custom React Hooks
│   │   ├── use-hse-data.ts          # إدارة بيانات HSE
│   │   ├── use-weather.ts           # بيانات الطقس
│   │   ├── use-signature-canvas.ts  # التوقيع الرقمي
│   │   ├── use-mobile.ts            # كشف الجوال
│   │   ├── usePermits.ts            # عمليات التصاريح
│   │   ├── useViolations.ts         # عمليات المخالفات
│   │   └── use-toast.ts             # إشعارات shadcn/ui
│   │
│   ├── services/                     # طبقة الخدمات
│   │   ├── hse-api.ts               # خدمة API البسيطة
│   │   └── weather-api.ts           # خدمة الطقس
│   │
│   ├── lib/                          # المكتبات الأساسية
│   │   ├── db.ts                    # Prisma Client
│   │   ├── api/                     # API Client المحسن
│   │   │   └── hse-client.ts        # HSE API Client
│   │   └── utils.ts                 # دوال مساعدة
│   │
│   ├── types/                        # أنواع TypeScript
│   │   └── hse.ts                   # أنواع بيانات HSE
│   │
│   ├── constants/                    # الثوابت
│   │   ├── app-config.ts            # إعدادات التطبيق
│   │   ├── hse.ts                   # ثوابت HSE
│   │   ├── inspection-checklists.ts # قوائم التفتيش
│   │   └── coshh-data.ts            # بيانات المواد الخطرة
│   │
│   └── utils/                        # دوال مساعدة
│       └── helpers.ts               # وظائف مساعدة
│
├── prisma/                           # قاعدة البيانات
│   └── schema.prisma                # مخطط قاعدة البيانات
│
├── public/                           # الملفات العامة
│   ├── logo.svg
│   └── robots.txt
│
├── PROJECT_PLAN.md                   # خطة التطوير (عربي)
├── ARCHITECTURE.md                   # وثيقة البنية (إنجليزي)
├── DEVELOPMENT_ROADMAP_AR.md        # خارطة الطريق (هذا الملف)
├── next.config.ts                    # إعدادات Next.js
├── tailwind.config.ts                # إعدادات Tailwind
└── package.json                      # تبعيات المشروع
```

---

## ✅ الوضع الحالي

### المرحلة 1: الأساسيات (مكتملة) ✅
- [x] إعداد المشروع والتهيئة
- [x] تصميم قاعدة البيانات (Prisma + SQLite)
- [x] إنشاء API Routes
- [x] بناء المكونات الأساسية
- [x] تنفيذ الميزات الرئيسية
- [x] دعم العربية و RTL
- [x] التصميم المتجاوب (Mobile-First)

### المرحلة 2: إعادة الهيكلة (مكتملة جزئياً) 🔄
- [x] تقسيم الملفات إلى وحدات منفصلة
- [x] إنشاء Custom Hooks
- [x] إنشاء Service Layer
- [x] تعريف أنواع TypeScript
- [x] استخراج الثوابت
- [x] إضافة JSDoc للـ Hooks
- [x] إزالة الملفات المكررة
- [ ] تحسين قابلية إعادة استخدام المكونات
- [ ] تحسين الأداء

---

## 🗺️ خارطة الطريق للتطوير

### المرحلة 3: التحسينات (القادمة)

#### 3.1 تحسين المكونات
- [ ] إنشاء مكونات قابلة لإعادة الاستخدام
  - [ ] `StatsCard` - بطاقة الإحصائيات
  - [ ] `EmptyState` - حالة عدم وجود بيانات
  - [ ] `LoadingSkeleton` - هيكل التحميل
  - [ ] `ConfirmDialog` - حوار التأكيد
  - [ ] `ImageUpload` - مكون رفع الصور

- [ ] تحسين المكونات الحالية
  - [ ] إضافة أدوات تحميل لجميع العمليات
  - [ ] تحسين معالجة الأخطاء
  - [ ] إضافة حالات فارغة (Empty States)
  - [ ] تحسين تجربة المستخدم

#### 3.2 إدارة الحالة المتقدمة
- [ ] إضافة Context API للتدويل
- [ ] إضافة Theme Provider للوضع الليلي
- [ ] استخدام React Query للتخزين المؤقت
- [ ] تحسين أداء إعادة العرض (Re-renders)

#### 3.3 التحقق من البيانات
- [ ] إضافة Zod للتحقق من النماذج
- [ ] إنشاء schemas لجميع البيانات
- [ ] عرض رسائل خطأ واضحة
- [ ] التحقق من صحة المدخلات

#### 3.4 معالجة الأخطاء
- [ ] إنشاء Error Boundaries
- [ ] صفحات خطأ مخصصة
- [ ] تسجيل الأخطاء (Error Logging)
- [ ] إشعارات خطأ أفضل

### المرحلة 4: الميزات المتقدمة

#### 4.1 البحث والفلترة
- [ ] بحث متقدم في جميع البيانات
- [ ] فلترة حسب التاريخ والحالة
- [ ] ترتيب النتائج
- [ ] حفظ البحثات المفضلة

#### 4.2 التصدير والطباعة
- [ ] تصدير البيانات إلى PDF
- [ ] تصدير البيانات إلى Excel/CSV
- [ ] طباعة التقارير
- [ ] مشاركة التقارير

#### 4.3 الإشعارات
- [ ] إشعارات فورية (Push Notifications)
- [ ] تذكيرات بالمواعيد
- [ ] تنبيهات المخالفات المفتوحة
- [ ] ملخصات يومية/أسبوعية

#### 4.4 PWA Features
- [ ] Service Worker للعمل Offline
- [ ] تخزين البيانات محلياً
- [ ] أيقونة التثبيت
- [ ] دعم التنقل باللمس

### المرحلة 5: الأمان والأداء

#### 5.1 الأمان
- [ ] Authentication & Authorization
- [ ] Role-based Access Control
- [ ] Audit Logs
- [ ] تشفير البيانات الحساسة
- [ ] Rate Limiting
- [ ] CSRF Protection
- [ ] Content Security Policy

#### 5.2 الأداء
- [ ] Code Splitting
- [ ] Lazy Loading
- [ ] تحسين الصور
- [ ] استراتيجيات التخزين المؤقت
- [ ] تحسين حجم الحزمة (Bundle)
- [ ] تحميل مسبق (Prefetching)

### المرحلة 6: التحليلات والتقارير

#### 6.1 لوحة التحليلات
- [ ] رسوم بيانية للاتجاهات
- [ ] مقاييس الأداء (KPIs)
- [ ] مؤشرات السلامة
- [ ] مقارنات زمنية

#### 6.2 التقارير المتقدمة
- [ ] تقارير مخصصة
- [ ] جداول بيانات تفاعلية
- [ ] تصورات البيانات
- [ ] التصدير بتنسيقات متعددة

### المرحلة 7: التدويل والمزيد

#### 7.1 دعم اللغات
- [ ] دعم الإنجليزية (LTR)
- [ ] التبديل بين العربية والإنجليزية
- [ ] ترجمة جميع النصوص
- [ ] تنسيق التواريخ والأرقام

#### 7.2 ميزات إضافية
- [ ] إرفاق ملفات متعددة
- [ ] التوقيع الإلكتروني المتقدم
- [ ] QR Codes للتقارير
- [ ] تكامل مع أنظمة أخرى
- [ ] API للطرف الثالث

---

## 📚 أفضل الممارسات

### 1. تنظيم الكود

#### ✅ نفعل:
```typescript
// هيكل يعتمد على الوظائف
features/dashboard/
  ├── Dashboard.tsx          // المكون الرئيسي
  ├── DashboardHeader.tsx   // رأس قابل لإعادة الاستخدام
  └── DashboardStats.tsx    // بطاقات الإحصائيات
```

#### ❌ لا نفعل:
```typescript
// هيكل يعتمد على النوع (تجنب)
components/
  ├── DashboardHeader.tsx
  ├── ViolationsHeader.tsx
  ├── PermitsHeader.tsx
```

### 2. استخدام Hooks

#### ✅ نفعل:
```typescript
// Hook قابل لإعادة الاستخدام
// hooks/use-hse-data.ts
export function useHSEData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, refresh: loadData };
}

// الاستخدام في المكونات
const { violations, loading, refresh } = useHSEData();
```

#### ❌ لا نفعل:
```typescript
// تكرار المنطق في كل مكون
const [violations, setViolations] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetchViolations();
}, []);
```

### 3. خدمة API

#### ✅ نفعل:
```typescript
// خدمة API مركزية
// lib/api/hse-client.ts
class HSEClient {
  async getViolations() { ... }
  async createViolation(data) { ... }
}

// الاستخدام في المكونات
const { data, loading, refresh } = useHSEData();
```

#### ❌ لا نفعل:
```typescript
// استدعاء fetch مباشر في المكونات
const response = await fetch('/api/hse/violations');
const data = await response.json();
```

### 4. أمان الأنواع (Type Safety)

#### ✅ نفعل:
```typescript
// أنواع مركزية
// types/hse.ts
export interface Violation {
  id: string;
  desc: string;
  resp: string;
  status: 'open' | 'closed';
}

// الاستيراد والاستخدام
import type { Violation } from '@/types/hse';
```

#### ❌ لا نفعل:
```typescript
// تكرار تعريفات الأنواع
interface ViolationData { ... }
interface ViolationItem { ... }
interface ViolationResponse { ... }
```

### 5. إدارة الثوابت

#### ✅ نفعل:
```typescript
// ثوابت مركزية
// constants/app-config.ts
export const TOAST_MESSAGES = {
  VIOLATION_CREATED: 'تم تسجيل المخالفة بنجاح',
  VIOLATION_CLOSED: 'تم إغلاق المخالفة',
  PERMIT_CREATED: 'تم إنشاء التصريح بنجاح',
} as const;
```

#### ❌ لا نفعل:
```typescript
// نصوص مشفرة في المكونات
toast.success('تم تسجيل المخالفة بنجاح');
// ... مكرر في أماكن أخرى
```

---

## 🛠️ دليل التطوير

### إضافة ميزة جديدة

```bash
# 1. إنشاء مجلد الميزة
mkdir -p src/features/new-feature

# 2. إنشاء المكونات
touch src/features/new-feature/NewFeature.tsx
touch src/features/new-feature/NewFeatureForm.tsx

# 3. إضافة الأنواع إذا لزم الأمر
# تحرير src/types/hse.ts

# 4. إضافة طرق API إذا لزم الأمر
# تحرير src/lib/api/hse-client.ts

# 5. إنشاء Hook مخصص إذا لزم الأمر
touch src/hooks/use-new-feature.ts

# 6. الدمج في الصفحة الرئيسية
# تحرير src/app/page.tsx
```

### تعديل ميزة موجودة

```bash
# 1. تحديد مجلد الميزة
cd src/features/feature-name

# 2. تعديل المكونات
# تعديل ملفات المكونات

# 3. تحديث الأنواع إذا لزم الأمر
# تحرير src/types/hse.ts

# 4. تحديث API إذا لزم الأمر
# تحرير src/lib/api/hse-client.ts

# 5. اختبار التغييرات
bun run lint
```

### إصلاح الأخطاء

```bash
# 1. تحديد المشكلة
# فحص console و network tab

# 2. تحديد الكود المشكلة
# استخدام البحث في IDE

# 3. إصلاح المشكلة
# تطبيق الإصلاح

# 4. اختبار الإصلاح
bun run lint
# اختبار يدوي

# 5. حفظ التغييرات
git commit -m "fix: وصف الإصلاح"
```

---

## 📊 مقاييس الجودة

### الأداء الحالي
- **وقت التحميل الأولي**: ~2-3 ثانية
- **وقت استجابة API**: ~50-100ms
- **حجم الحزمة**: ~500KB (مضغوط)

### الأهداف المستقبلية
- **وقت التحميل الأولي**: <2 ثانية
- **وقت استجابة API**: <50ms
- **حجم الحزمة**: <300KB (مضغوط)
- **نقاط Lighthouse**: >90

### استراتيجيات التحسين
1. Code splitting باستخدام dynamic imports
2. تحسين الصور باستخدام next/image
3. تخزين البيانات مؤقتاً باستخدام React Query
4. Memoization باستخدام React.memo
5. Lazy loading للمكونات الثقيلة

---

## 🎨 إرشادات UI/UX

### نظام التصميم
- **اللون الأساسي**: أخضر الزمرد (#10b981)
- **اللون الثانوي**: أزرق السليت (#0f172a)
- **ألوان التمييز**: أحمر (خطر)، أصفر (تحذير)
- **الخط**: Tajawal (عربي)، Inter (إنجليزي)
- **نصف قطر الحواف**: 0.625rem (10px)

### نقاط الاستجابة
- **الجوال**: < 640px
- **التابلت**: 640px - 1024px
- **السطح المكتب**: > 1024px

### إمكانية الوصول
- علامات ARIA على جميع العناصر التفاعلية
- دعم التنقل بلوحة المفاتيح
- التوافق مع قارئات الشاشة
- نسبة تباين عالية (4.5:1 كحد أدنى)

---

## 🔒 اعتبارات الأمان

### 1. التحقق من المدخلات
```typescript
import { z } from 'zod';

const violationSchema = z.object({
  desc: z.string().min(10).max(500),
  resp: z.string().min(2).max(100),
});
```

### 2. منع حقن SQL
- استخدام Prisma ORM (استعلامات مُعلمَة)
- عدم دمج مدخلات المستخدم في الاستعلامات

### 3. منع XSS
- استخدام escaping المدمج في React
- التحقق وتعقيم مدخلات المستخدم
- Content Security Policy headers

### 4. المصادقة (مستقبلاً)
- دمج NextAuth.js
- التحكم بالوصول بناءً على الأدوار
- إدارة الجلسات

---

## 📝 الخاتمة

توفر هذه البنية:
- ✅ **القابلية للصيانة**: فصل واضح للمسؤوليات
- ✅ **قابلية التوسع**: سهولة إضافة ميزات جديدة
- ✅ **قابلية الاختبار**: وحدات معزولة وقابلة للاختبار
- ✅ **الأداء**: محسّن للسرعة
- ✅ **تجربة المطور**: هيكل بديهي

### الخطوات التالية:
1. إكمال المرحلة 3 (التحسينات)
2. بدء المرحلة 4 (الميزات المتقدمة)
3. تنفيذ الاختبارات
4. إضافة تحسينات الأداء
5. النشر والمراقبة

---

**آخر تحديث**: 2024
**الإصدار**: 2.0.0
**الحالة**: قيد التطوير النشط

---

## 📞 الدعم والموارد

### الوثائق الموصى بها
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)

### أدوات التطوير الموصى بها
- **IDE**: VS Code مع extensions الموصى بها
- **ESLint**: لفحص جودة الكود
- **Prettier**: لتنسيق الكود
- **Git**: لإدارة الإصدارات
- **Chrome DevTools**: لتصحيح الأخطاء
