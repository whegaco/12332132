#!/bin/bash

# 🔄 Script للتحويل من SQLite إلى PostgreSQL للنشر على Vercel

echo "🚀 بدء التحويل من SQLite إلى PostgreSQL..."
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ خطأ: DATABASE_URL غير معرف"
    echo ""
    echo "الرجاء تعيين DATABASE_URL أولاً:"
    echo "export DATABASE_URL=\"postgresql://user:password@host:port/database?schema=public\""
    echo ""
    exit 1
fi

# Backup current SQLite database
echo "📦 نسخ احتياطي لقاعدة البيانات الحالية..."
cp prisma/dev.db prisma/dev.db.backup 2>/dev/null || echo "⚠️  لا توجد قاعدة بيانات SQLite للنسخ الاحتياطي"

# Backup current schema
echo "📄 نسخ احتياطي للـ Schema الحالي..."
cp prisma/schema.prisma prisma/schema.sqlite.backup 2>/dev/null || true

# Copy PostgreSQL schema
echo "🔄 تحديث الـ Schema إلى PostgreSQL..."
cp prisma/schema.postgres.prisma prisma/schema.prisma

# Generate Prisma Client
echo "⚙️  توليد Prisma Client..."
npx prisma generate

# Push schema to database
echo "📤 دفع الـ Schema إلى قاعدة البيانات..."
npx prisma db push

echo ""
echo "✅ تم التحويل بنجاح!"
echo ""
echo "الخطوات التالية:"
echo "1. اختبر التطبيق محلياً: npm run dev"
echo "2. تأكد من عمل جميع الميزات"
echo "3. ادفع الكود إلى GitHub"
echo "4. اضغط على Deploy في Vercel"
echo ""
echo "⚠️  ملاحظة: النسخ الاحتياطية محفوظة في:"
echo "   - prisma/dev.db.backup (قاعدة البيانات SQLite)"
echo "   - prisma/schema.sqlite.backup (الـ Schema القديم)"
