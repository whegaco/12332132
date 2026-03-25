# خطة تطوير محتوى تطبيق SafetyPro HSE Enterprise

## نظرة عامة
هذهه الخطة تهدف لتطوير وتحسين محتوى التطبيق في جميع الأقسام، مع إضافة ميزات جديدة وتحسين قواعد البيانات.

---

## المرحلة 1: تحسين قواعد البيانات

### 1.1 تحسين نموذج المخالفات (Violation)

**التحسينات المقترحة:**
- إضافة حقل `photo` لتخزين صورة المخالفة
- إضافة حقل `location` للموقع الدقيق
- إضافة حقل `category` للتصنيف (عامة، كهرباء، حريق، إلخ)
- إضافة حقل `severity` للشدة (critical, major, minor)
- إضافة حقل `closedAt` لتاريخ الإصلاح
- إضافة حقل `closedBy` لاسم من قام بالإصلاح
- إضافة حقل `reporter` لاسم المُبلغ

**Schema المحدث:**
```prisma
model Violation {
  id          String   @id @default(cuid())
  desc        String
  resp        String
  status      String   @default("open")
  category    String   @default("general")
  severity    String   @default("minor")
  location    String?
  photo       String?
  reporter    String?
  date        DateTime
  closedAt    DateTime?
  closedBy    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

### 1.2 تحسين نموذج التصاريح (Permit)

**التحسينات المقترحة:**
- إضافة حقل `photo` لصورة الموقع قبل العمل
- إضافة حقل `startTime` لوقت البدء
- إضافة حقل `endTime` لوقت الانتهاء
- إضافة حقل `approvedBy` لمن وافق على التصريح
- إضافة حقل `approvedAt` لتاريخ الموافقة
- إضافة حقل `riskLevel` لمستوى المخاطرة
- إضافة حقل `ppeRequired` لمتطلبات PPE

**Schema المحدث:**
```prisma
model Permit {
  id           String   @id @default(cuid())
  type         String
  loc          String
  desc         String?
  signature    String?
  photo        String?
  startTime    DateTime?
  endTime      DateTime?
  status       String   @default("pending")
  riskLevel    String   @default("low")
  ppeRequired  String?
  approvedBy   String?
  approvedAt   DateTime?
  date         DateTime
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

---

### 1.3 تحسين نموذج التقارير (InspectionReport)

**التحسينات المقترحة:**
- إضافة حقل `inspectorName` لاسم المفتش الكامل
- إضافة حقل `department` للقسم المسؤول
- إضافة حقل `recommendations` للتوصيات
- إضافة حقل `followUpDate` لتاريخ المتابعة
- إضافة حقل `followUpStatus` لحالة المتابعة

**Schema المحدث:**
```prisma
model InspectionReport {
  id               String   @id @default(cuid())
  type             String
  score            Int
  issues           String
  image            String?
  notes            String?
  location         String
  inspector        String
  inspectorName    String?
  department       String?
  recommendations   String?
  followUpDate     DateTime?
  followUpStatus   String?
  status           String
  date             DateTime
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}
```

---

### 1.4 تحسين نموذج TBT

**التحسينات المقترحة:**
- إضافة حقل `presenterName` لاسم المحاضر
- إضافة حقل `topics` (JSON) لموضوعات متعددة
- إضافة حقل `duration` لمدة الاجتماع بالدقائق
- إضافة حقل `actionItems` للنقاط العملية
- إضافة حقل `department` للقسم

**Schema المحدث:**
```prisma
model TBT {
  id            String   @id @default(cuid())
  topic         String
  attendees     String
  presenterName String?
  topics        String?
  duration      Int?
  photo         String?
  signature     String?
  actionItems   String?
  department    String?
  date          DateTime
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

---

### 1.5 تحسين نموذج الحوادث الوشيكة (NearMiss)

**التحسينات المقترحة:**
- إضافة حقل `reportedBy` لاسم المُبلغ
- إضافة حقل `category` للفئة (معدات، إجراءات، بيئة، إلخ)
- إضافة حقل `potentialConsequence` للعاقبة المحتملة
- إضافة حقل `preventiveAction` للإجراء الوقائي المتخذ
- إضافة حقل `resolved` ما إذا تم حل المشكلة
- إضافة حقل `resolvedAt` تاريخ الحل

**Schema المحدث:**
```prisma
model NearMiss {
  id                    String   @id @default(cuid())
  loc                   String
  desc                  String
  severity              String
  category              String?
  reportedBy            String?
  photo                 String?
  potentialConsequence  String?
  preventiveAction      String?
  resolved              Boolean  @default(false)
  resolvedAt            DateTime?
  date                  DateTime
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
}
```

---

## المرحلة 2: تطوير الأقسام

### 2.1 قسم المخالفات (Violations)

**الميزات الجديدة:**
1. إضافة صور للمخالفة (التقاط من الكاميرا أو رفع من المعرض)
2. إضافة حقل الموقع الدقيق
3. تصنيف المخالفة (عامة، كهرباء، حريق، ارتفاعات، إلخ)
4. تحديد شدة المخالفة (حرجة، رئيسية، ثانوية)
5. تسجيل المُبلغ
6. تسجيل من قام بالإصلاح وتاريخه
7. عرض الصورة في قائمة المخالفات

**واجهة المستخدم:**
- نموذج إضافة مخالفة محسّن
- عرض صورة المصغرة في القائمة
- عرض الصورة كاملة عند النقر
- فلترة حسب التصنيف والشدة

---

### 2.2 قسم التصاريح (Permits)

**الميزات الجديدة:**
1. إضافة صورة للموقع قبل العمل
2. تحديد مستوى المخاطرة (منخفضة، متوسطة، عالية، عالية جداً)
3. إضافة متطلبات PPE (معدات الحماية الشخصية)
4. تحديد وقت البدء والانتهاء
5. تسجيل من وافق على التصريح وتاريخ الموافقة
6. عرض صورة الموقع في التصريح

**واجهة المستخدم:**
- نموذج طلب تصريح محسّن
- عرض الصورة في التفاصيل
- عرض حالة التصريح مع التوقيت

---

### 2.3 قسم التفتيش (Inspection)

**الميزات الجديدة:**
1. إضافة اسم المفتش الكامل
2. إضافة القسم المسؤول
3. إضافة التوصيات والملاحظات
4. تحديد تاريخ المتابعة
5. حالة المتابعة (مفتوحة، مغلقة، متأخرة)
6. تصنيفات فحص إضافية

**واجهة المستخدم:**
- نموذج فحص محسّن
- عرض التفاصيل الكاملة للتقرير
- إمكانية المتابعة على التوصيات

---

### 2.4 قسم اجتماعات TBT

**الميزات الجديدة:**
1. إضافة اسم المحاضر
2. دعم موضوعات متعددة للاجتماع
3. تحديد مدة الاجتماع
4. تسجيل النقاط العملية
5. تحديد القسم المسؤول
6. تحسين عرض صور الحضور

**واجهة المستخدم:**
- نموذج TBT محسّن
- عرض التفاصيل الكاملة للاجتماع
- عرض النقاط العملية

---

### 2.5 قسم الحوادث الوشيكة (Near Miss)

**الميزات الجديدة:**
1. إضافة اسم المُبلغ
2. تصنيف الحادث (معدات، إجراءات، بيئة، سلوك، إلخ)
3. وصف العاقبة المحتملة
4. تسجيل الإجراء الوقائي المتخذ
5. تحديد ما إذا تم حل المشكلة
6. تحسين عرض الصور

**واجهة المستخدم:**
- نموذج تقرير حادث وشيكة محسّن
- عرض التفاصيل الكاملة
- عرض حالة الحل

---

### 2.6 قسم المواد الخطرة (COSHH)

**الميزات الجديدة:**
1. إضافة صور للمادة
2. إضافة كمية المادة
3. إضافة مكان التخزين
4. إضافة تاريخ الانتهاء
5. إضافة اسم المورّد
6. إضافة رقم MSDS

**واجهة المستخدم:**
- عرض المواد مع صورها
- إمكانية البحث المتقدم
- عرض تفاصيل المواد بشكل أفضل

---

### 2.7 قسم التقارير (Reports)

**الميزات الجديدة:**
1. عرض التفاصيل الكاملة للتقرير
2. عرض الصور المرفقة
3. عرض التوصيات
4. عرض حالة المتابعة
5. تصدير التقرير كـ PDF
6. مشاركة التقرير

**واجهة المستخدم:**
- بطاقات تقارير محسّنة
- عرض التفاصيل في Modal
- أزرار التصدير والمشاركة

---

## المرحلة 3: الميزات العامة

### 3.1 البحث والفلترة المتقدمة
- بحث في جميع الأقسام
- فلترة متعددة المعايير
- حفظ البحثات المفضلة

### 3.2 الإحصائيات والتحليلات
- رسوم بيانية للمخالفات حسب الفئة
- رسوم بيانية للحوادث الوشيكة
- إحصائيات التصاريح النشطة
- معدلات الامتثال

### 3.3 الإشعارات
- إشعارات للمخالفات المفتوحة
- تذكيرات بانتهاء صلاحية التصاريح
- تنبيهات للحوادث الوشيكة الجديدة

### 3.4 التصدير والطباعة
- تصدير التقارير كـ PDF
- طباعة شهادات
- تصدير البيانات كـ Excel

---

## جدول التنفيذ

| الأسبوع | المهام |
|---------|--------|
| الأسبوع 1 | تحديث Schema و Types + إعادة بناء قاعدة البيانات |
| الأسبوع 2 | تحسين قسم المخالفات (صور، تصنيفات، موقع) |
| الأسبوع 3 | تحسين قسم التصاريح (صور، مخاطرة، PPE) |
| الأسبوع 4 | تحسين قسم التفتيش (توصيات، متابعة) |
| الأسبوع 5 | تحسين قسم TBT (مواضيع متعددة، نقاط عمل) |
| الأسبوع 6 | تحسين قسم الحوادث الوشيكة (تصنيف، حل) |
| الأسبوع 7 | تحسين قسم المواد الخطرة (صور، تفاصيل) |
| الأسبوع 8 | تحسين قسم التقارير (تصدير، مشاركة) |
| الأسبوع 9-10 | ميزات عامة (بحث، فلترة، إحصائيات) |
| الأسبوع 11-12 | اختبار شامل وتحسينات نهائية |

---

**الحالة**: خطة التطوير جاهزة للتنفيذ ✅
