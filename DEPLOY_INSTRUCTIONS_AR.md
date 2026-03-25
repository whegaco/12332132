# 🚀 تعليمات نشر التطبيق على Vercel

## الخطوات النهائية للنشر

### ✅ ما تم إعداده بالفعل:

1. ✅ تم إنشاء ملفات البيئة (`.env` و `.env.local`) مع رابط قاعدة بيانات PostgreSQL
2. ✅ تم تحديث هيكل Prisma لاستخدام PostgreSQL
3. ✅ تم إنشاء عميل Prisma بنجاح
4. ✅ تم مزامنة قاعدة البيانات بنجاح
5. ✅ تم إصلاح ملف `vercel.json` وإزالة المرجع غير الصحيح
6. ✅ فحص الجودة: لا توجد أخطاء (فقط تحذير واحد للخطوط)

### 📋 الخطوات التالية للنشر على Vercel:

#### 1. تسجيل الدخول إلى Vercel
- افتح [vercel.com](https://vercel.com)
- سجل الدخول بحسابك

#### 2. إنشاء مشروع جديد
- انقر على **"Add New Project"**
- قم بربط مستودع GitHub الخاص بك

#### 3. إعداد متغيرات البيئة (Environment Variables)
أضف المتغير التالي في إعدادات المشروع:

**الاسم:** `DATABASE_URL`
**القيمة:**
```
postgresql://neondb_owner:npg_riKRoDBC26nA@ep-blue-forest-an32yvqo-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

**مكان الإضافة:**
- اذهب إلى **Settings** → **Environment Variables**
- أو أضفها أثناء إعداد المشروع في قسم **Environment Variables**

#### 4. إعدادات البناء (Build Settings)
في Vercel، تأكد من أن الإعدادات كالتالي:

- **Framework Preset:** Next.js
- **Build Command:** `npx prisma generate && next build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

⚠️ **مهم:** إذا كنت تستخدم `bun` محلياً، فإن Vercel يستخدم `npm` تلقائياً. هذا طبيعي ومقبول.

#### 5. نشر المشروع
- انقر على **"Deploy"**
- انتظر حتى تنتهي عملية البناء والنشر
- ستكون نسختك جاهزة في دقيقة أو دقيقتين

### 🔧 إصلاح المشكلة السابقة:

تم حل المشكلة:
```
Environment Variable "DATABASE_URL" references Secret "database-url", which does not exist.
```

**السبب:** كان الملف `vercel.json` يشير إلى سري (Secret) غير موجود في Vercel.
**الحل:** تم إزالة هذا المرجع من `vercel.json`، والآن سيتم استخدام متغير البيئة `DATABASE_URL` مباشرة.

### 📊 ملفات البيئة في المشروع:

1. **`.env`** - للإنتاج (Production)
2. **`.env.local`** - للتطوير المحلي
3. **`.env.example`** - نموذج للإشارة (يُستخدم كمرجع فقط)

⚠️ **مهم:** تأكد من عدم رفع `.env` و `.env.local` إلى GitHub إذا كانا يحتويان على معلومات حساسة.

### 🧪 اختبار ما بعد النشر:

بعد النشر الناجح، تأكد من:

1. ✅ فتح الموقع والتحقق من عدم وجود أخطاء
2. ✅ تسجيل دخول واختبار الميزات الأساسية
3. ✅ إنشاء مخالفة جديدة للتأكد من اتصال قاعدة البيانات
4. ✅ اختبار تبديل اللغة والمظهر
5. ✅ التحقق من عمل حالة الشبكة (أونلاين/أوفلاين)

### 🌍 رابط النشر:

بعد اكتمال النشر، ستحصل على:
- رابط الإنتاج: `https://your-project-name.vercel.app`
- رابط الاختبار: `https://your-project-name-git-branch.vercel.app`

### 📝 ملاحظات إضافية:

1. **قاعدة البيانات:** تم استخدام قاعدة بيانات Neon PostgreSQL وهي جاهزة للاستخدام
2. **المنطقة:** تم ضبط النشر على منطقة `hkg1` (هونغ كونغ) للسرعة في الشرق الأوسط
3. **البناء التلقائي:** أي تغييرات ترفعها إلى GitHub سيتم بناؤها ونشرها تلقائياً

### 🎯 المشروع جاهز الآن للنشر!

فقط اتبع الخطوات أعلاه وسيعمل التطبيق بشكل ممتاز على Vercel.

---

**لأي استفسارات، راجع الوثائق:**
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Prisma with Vercel](https://www.prisma.io/docs/guides/deployment/deploying-to-vercel)
