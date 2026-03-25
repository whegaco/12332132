# 🚀 دليل نشر تطبيق HSE على Vercel

## ⚠️ ملاحظة هامة جداً

التطبيق الحالي يستخدم **SQLite** كقاعدة بيانات. **SQLite لا يعمل على Vercel** لأن Vercel منصة serverless.

للنشر على Vercel، يجب تغيير قاعدة البيانات إلى **PostgreSQL** أو **MySQL**.

---

## 📋 المتطلبات

### 1. قاعدة بيانات PostgreSQL (مطلوبة)

اختيارات مجانية ممتازة:

#### 🌟 **Neon PostgreSQL** (موصى به - مجاني وسهل)
1. اذهب إلى: https://neon.tech
2. أنشئ حساب مجاني
3. أنشئ مشروع جديد
4. انسخ Connection String (DATABASE_URL)

#### 🌟 **Supabase PostgreSQL** (موصى به - مجاني)
1. اذهب إلى: https://supabase.com
2. أنشئ حساب مجاني
3. أنشئ مشروع جديد
4. Settings → Database → Connection String
5. انسخ Connection String

#### 🌟 **PlanetScale MySQL** (بديل MySQL)
1. اذهب إلى: https://planetscale.com
2. أنشئ حساب مجاني
3. أنشئ قاعدة بيانات
4. انسخ Connection String

---

## 📝 خطوات النشر

### الخطوة 1: إعداد قاعدة البيانات

```bash
# اختر أحد الخيارات أعلاه واحصل على DATABASE_URL
# مثال لـ DATABASE_URL:
DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
```

### الخطوة 2: تحديث Schema Prisma

```bash
# استبدل ملف prisma/schema.prisma بـ prisma/schema.postgres.prisma
cp prisma/schema.postgres.prisma prisma/schema.prisma
```

### الخطوة 3: إنشاء ملف `.env`

```bash
# أنشئ ملف .env في جذر المشروع
echo "DATABASE_URL=your-database-url-here" > .env
```

### الخطوة 4: تثبيت الاعتمادات

```bash
# تثبيت جميع الحزم
npm install

# أو استخدام bun
bun install
```

### الخطوة 5: تهيئة قاعدة البيانات

```bash
# إنشاء جداول قاعدة البيانات
npx prisma db push

# أو إذا استخدمت bun
bun prisma db push
```

### الخطوة 6: اختبار محلي

```bash
# تشغيل التطبيق محلياً
npm run dev

# أو
bun run dev
```

### الخطوة 7: الدفع إلى GitHub

```bash
# إضافة ملفات المشروع
git add .

# الالتزام
git commit -m "Prepare for Vercel deployment"

# الدفع إلى GitHub
git push origin main
```

---

## 🔧 إعداد Vercel

### 1. إنشاء حساب Vercel

1. اذهب إلى: https://vercel.com
2. أنشئ حساب مجاني باستخدام GitHub

### 2. استيراد المشروع

1. في Vercel، اضغط على "Add New Project"
2. اختر المستودع (Repository) من GitHub
3. Vercel سيكتشف تلقائياً أنه مشروع Next.js

### 3. إعداد Environment Variables

في صفحة إعدادات المشروع:

```
Name: DATABASE_URL
Value: postgresql://user:password@host:port/database?schema=public
```

💡 **مهم**: تأكد من إضافة `?schema=public` في نهاية URL

### 4. إعدادات البناء (Build Settings)

إذا لم يتم الكشف تلقائياً، استخدم:

```
Framework Preset: Next.js
Build Command: npx prisma generate && npm run build
Output Directory: .next
Install Command: npm install
```

### 5. النشر

1. اضغط على "Deploy"
2. انتظر اكتمال النشر (تقريباً 2-5 دقائق)
3. ستحصل على رابط مثل: `https://your-app.vercel.app`

---

## 🔄 نشر التحديثات

بعد كل تغيير في الكود:

```bash
# إضافة الملفات
git add .

# الالتزام
git commit -m "Your commit message"

# الدفع
git push origin main

# Vercel سينشر تلقائياً
```

---

## 🗄️ تتبع قاعدة البيانات (مهم جداً)

### بعد تغيير Schema

```bash
# عند تغيير prisma/schema.prisma
npx prisma db push
```

### عند إضافة جداول جديدة

```bash
# يمكن أيضاً استخدام migration
npx prisma migrate dev --name your-migration-name
```

---

## ⚙️ إعدادات إضافية (اختياري)

### إضافة Domain مخصص

1. في Vercel → Settings → Domains
2. اضغط "Add Domain"
3. اتبع التعليمات لإضافة DNS records

### إضافة Environment Variables إضافية

في Vercel → Settings → Environment Variables:

```
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

---

## 🐛 حل المشاكل الشائعة

### مشكلة: "Database connection failed"

**الحل:**
1. تأكد من صحة `DATABASE_URL`
2. تأكد من إضافة `?schema=public`
3. تحقق من إعدادات قاعدة البيانات (أسماء المستخدمين والصلاحيات)

### مشكلة: "Prisma Client initialization failed"

**الحل:**
1. تأكد من تشغيل `npx prisma generate` قبل البناء
2. في Vercel، أضف `npx prisma generate` في Build Command

### مشكلة: "Build timeout"

**الحل:**
1. في `vercel.json`، أضف:
```json
{
  "buildCommand": "npx prisma generate && npm run build",
  "installCommand": "npm install"
}
```

---

## 📊 مراقبة الأداء

في Vercel Dashboard:

1. **Analytics**: مشاهدة عدد الزوار والأداء
2. **Logs**: مشاهدة سجلات الأخطاء
3. **Deployments**: تتبع جميع عمليات النشر

---

## 🔒 الأمان

### حماية قاعدة البيانات

1. لا تضع `.env` في Git
2. استخدم Environment Variables فقط
3. قم بتشفير الاتصال (SSL مفعّل تلقائياً في Neon و Supabase)

---

## 📱 PWA Support

التطبيق يدعم العمل بدون إنترنت (PWA):

- ✅ Service Worker مسجل تلقائياً
- ✅ IndexedDB لحفظ البيانات محلياً
- ✅ Network Status Banner

---

## 🎉 الخلاصة

### الخطوات السريعة:

1. ✅ إنشاء حساب على Neon أو Supabase
2. ✅ الحصول على `DATABASE_URL`
3. ✅ تحديث `prisma/schema.prisma` إلى PostgreSQL
4. ✅ إضافة `DATABASE_URL` في Environment Variables على Vercel
5. ✅ ربط المستودع (Repository) بـ Vercel
6. ✅ النشر!

---

## 📞 الدعم

إذا واجهت مشاكل:

- [Vercel Documentation](https://vercel.com/docs)
- [Prisma + Vercel Guide](https://www.prisma.io/docs/guides/deployment/deploying-to-vercel)
- [Neon + Vercel Guide](https://neon.tech/docs/guides/vercel)

---

**ملاحظة أخيرة:** بعد النشر، تأكد من عمل جميع الميزات محلياً أولاً باستخدام قاعدة البيانات الجديدة!
