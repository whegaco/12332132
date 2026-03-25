# 🚀 نشر سريع على Vercel

## المتطلبات الأساسية

1. حساب على [Vercel](https://vercel.com) (مجاني)
2. حساب على [Neon](https://neon.tech) أو [Supabase](https://supabase.com) (مجاني)
3. حساب على [GitHub](https://github.com) (مجاني)

---

## الخطوات السريعة (5 دقائق)

### 1️⃣ إنشاء قاعدة بيانات PostgreSQL

**خيار أ: Neon (أسهل)**
```
1. https://neon.tech/signup
2. أنشئ مشروع جديد
3. انسخ Connection String
```

**خيار ب: Supabase**
```
1. https://supabase.com/signup
2. أنشئ مشروع جديد
3. Settings → Database → Connection String
4. انسخ Connection String
```

### 2️⃣ تحديث المشروع

```bash
# تعيين DATABASE_URL
export DATABASE_URL="postgresql://user:password@host:port/database?schema=public"

# تشغيل سكريبت التحويل
bash scripts/migrate-to-postgres.sh

# اختبار محلي
npm run dev
```

### 3️⃣ ربط بـ GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 4️⃣ النشر على Vercel

```
1. https://vercel.com/new
2. استيراد المستودع من GitHub
3. إضافة Environment Variable:
   Name: DATABASE_URL
   Value: (الرابط الذي نسخته من Neon/Supabase)
4. اضغط "Deploy"
```

### 5️⃣ انتهى! 🎉

التطبيق الآن على: `https://your-app-name.vercel.app`

---

## الدعم

للمزيد من التفاصيل، راجع: [DEPLOYMENT_VERCEL.md](./DEPLOYMENT_VERCEL.md)
