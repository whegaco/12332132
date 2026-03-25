# SafetyPro HSE Enterprise - خطة التطوير الشاملة

## 📋 نظرة عامة
نظام متكامل لإدارة الصحة والسلامة المهنية (HSE) مبني على Next.js 16، TypeScript، Prisma، و shadcn/ui.

---

## 🏗️ هيكل المشروع المقترح

```
src/
├── app/
│   ├── api/hse/              # API Routes
│   │   ├── settings/
│   │   ├── violations/
│   │   ├── permits/
│   │   ├── reports/
│   │   ├── tbts/
│   │   └── nearmisses/
│   ├── layout.tsx            # Layout رئيسي مع RTL
│   └── page.tsx              # الصفحة الرئيسية
│
├── components/
│   ├── ui/                   # shadcn/ui components
│   │
│   └── hse/                  # مكونات HSE المخصصة
│       ├── layout/
│       │   ├── header.tsx
│       │   ├── bottom-nav.tsx
│       │   └── menu-sheet.tsx
│       │
│       ├── dashboard/
│       │   ├── index.tsx
│       │   ├── stats-card.tsx
│       │   ├── weather-widget.tsx
│       │   └── safety-index.tsx
│       │
│       ├── violations/
│       │   ├── index.tsx
│       │   ├── violation-list.tsx
│       │   ├── violation-card.tsx
│       │   └── add-violation-dialog.tsx
│       │
│       ├── permits/
│       │   ├── index.tsx
│       │   ├── permit-list.tsx
│       │   ├── permit-card.tsx
│       │   └── add-permit-dialog.tsx
│       │
│       ├── inspection/
│       │   ├── index.tsx
│       │   ├── category-selector.tsx
│       │   ├── checklist-view.tsx
│       │   └── inspection-summary.tsx
│       │
│       ├── tbt/
│       │   ├── index.tsx
│       │   ├── tbt-form.tsx
│       │   └── tbt-list.tsx
│       │
│       ├── near-miss/
│       │   ├── index.tsx
│       │   ├── near-miss-form.tsx
│       │   └── near-miss-list.tsx
│       │
│       ├── coshh/
│       │   └── index.tsx
│       │
│       └── settings/
│           └── index.tsx
│
├── hooks/
│   ├── useHSEData.ts         # Hook لجلب البيانات
│   ├── useViolations.ts      # Hook للمخالفات
│   ├── usePermits.ts         # Hook للتصاريح
│   ├── useInspections.ts     # Hook للتقارير
│   ├── useTBT.ts             # Hook لاجتماعات TBT
│   ├── useNearMiss.ts        # Hook للحوادث الوشيكة
│   ├── useSettings.ts        # Hook للإعدادات
│   ├── useWeather.ts         # Hook للطقس
│   ├── useSignatureCanvas.ts # Hook للتوقيع الرقمي
│   └── useImageUpload.ts     # Hook لرفع الصور
│
├── lib/
│   ├── db.ts                 # Prisma Client
│   ├── api/
│   │   └── hse-client.ts      # API Client مصغر
│   ├── utils.ts              # Utility functions
│   └── constants.ts          # الثوابت المشتركة
│
├── types/
│   └── hse.ts                # TypeScript types
│
└── constants/
    ├── checklists.ts         # قوائم الفحص
    ├── coshh-data.ts         # بيانات المواد الخطرة
    └── permit-types.ts       # أنواع التصاريح
```

---

## 📦 المكونات الرئيسية

### 1. **Dashboard Module** (`components/hse/dashboard/`)
- **StatsCard**: بطاقة الإحصائيات
- **WeatherWidget**: معلومات الطقس
- **SafetyIndex**: مؤشر الأمان العام

### 2. **Violations Module** (`components/hse/violations/`)
- **ViolationList**: قائمة المخالفات
- **ViolationCard**: بطاقة مخالفة واحدة
- **AddViolationDialog**: حوار إضافة مخالفة

### 3. **Permits Module** (`components/hse/permits/`)
- **PermitList**: قائمة التصاريح
- **PermitCard**: بطاقة تصريح واحد
- **AddPermitDialog**: حوار إضافة تصريح

### 4. **Inspection Module** (`components/hse/inspection/`)
- **CategorySelector**: اختيار نوع الفحص
- **ChecklistView**: عرض القائمة المرجعية
- **InspectionSummary**: ملخص التقرير

### 5. **TBT Module** (`components/hse/tbt/`)
- **TBTForm**: نموذج اجتماع TBT
- **TBTList**: قائمة الاجتماعات السابقة

### 6. **Near-Miss Module** (`components/hse/near-miss/`)
- **NearMissForm**: نموذج تقرير الحادث الوشيك
- **NearMissList**: قائمة التقارير

### 7. **COSHH Module** (`components/hse/coshh/`)
- عرض معلومات المواد الخطرة

### 8. **Settings Module** (`components/hse/settings/`)
- إعدادات النظام

---

## 🔧 Custom Hooks

### **useHSEData**
```typescript
interface UseHSEDataReturn {
  data: HSEData;
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}
```

### **useViolations**
```typescript
interface UseViolationsReturn {
  violations: Violation[];
  loading: boolean;
  addViolation: (data: ViolationInput) => Promise<void>;
  updateViolation: (id: string, status: string) => Promise<void>;
  deleteViolation: (id: string) => Promise<void>;
}
```

### **usePermits**
```typescript
interface UsePermitsReturn {
  permits: Permit[];
  loading: boolean;
  addPermit: (data: PermitInput) => Promise<void>;
  approvePermit: (id: string) => Promise<void>;
}
```

### **useInspections**
```typescript
interface UseInspectionsReturn {
  reports: Report[];
  loading: boolean;
  createReport: (data: ReportInput) => Promise<void>;
}
```

### **useSignatureCanvas**
```typescript
interface UseSignatureCanvasReturn {
  canvasRef: RefObject<HTMLCanvasElement>;
  signature: string | null;
  clearSignature: () => void;
  isDrawing: boolean;
}
```

### **useImageUpload**
```typescript
interface UseImageUploadReturn {
  handleImageUpload: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  image: string | null;
  clearImage: () => void;
  uploadProgress: number;
}
```

---

## 📝 TypeScript Types

### الأنواع الأساسية
```typescript
// types/hse.ts
export interface HSESettings {
  id: string;
  userName: string;
  siteName: string;
  companyName: string;
  createdAt: string;
  updatedAt: string;
}

export interface Violation {
  id: string;
  desc: string;
  resp: string;
  status: 'open' | 'closed';
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Permit {
  id: string;
  type: string;
  loc: string;
  desc: string | null;
  signature: string | null;
  status: 'pending' | 'approved';
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface InspectionReport {
  id: string;
  type: string;
  score: number;
  issues: string; // JSON array
  image: string | null;
  notes: string | null;
  location: string;
  inspector: string;
  status: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface TBT {
  id: string;
  topic: string;
  attendees: string;
  photo: string | null;
  signature: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface NearMiss {
  id: string;
  loc: string;
  desc: string;
  severity: 'high' | 'medium' | 'low';
  photo: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface WeatherData {
  temperature_2m: number;
  wind_speed_10m: number;
}
```

---

## 🌐 API Client

### HSEClient Class
```typescript
class HSEClient {
  // Settings
  getSettings(): Promise<HSESettings>;
  updateSettings(data: Partial<HSESettings>): Promise<HSESettings>;

  // Violations
  getViolations(): Promise<Violation[]>;
  createViolation(data: ViolationInput): Promise<Violation>;
  updateViolation(id: string, data: Partial<Violation>): Promise<Violation>;
  deleteViolation(id: string): Promise<void>;

  // Permits
  getPermits(): Promise<Permit[]>;
  createPermit(data: PermitInput): Promise<Permit>;
  updatePermit(id: string, data: Partial<Permit>): Promise<Permit>;

  // Reports
  getReports(): Promise<InspectionReport[]>;
  createReport(data: ReportInput): Promise<InspectionReport>;

  // TBT
  getTBTs(): Promise<TBT[]>;
  createTBT(data: TBTInput): Promise<TBT>;

  // Near Miss
  getNearMisses(): Promise<NearMiss[]>;
  createNearMiss(data: NearMissInput): Promise<NearMiss>;
}

export const hseClient = new HSEClient();
```

---

## 🎨 المبادئ الأساسية للتصميم

### 1. **Single Responsibility**
- كل مكون مسؤول عن وظيفة واحدة
- كل hook مسؤول عن منطق واحد

### 2. **Separation of Concerns**
- العرض في components
- المنطق في hooks
- البيانات في types
- الثوابت في constants

### 3. **Reusability**
- مكونات قابلة لإعادة الاستخدام
- hooks قابلة لإعادة الاستخدام
- utility functions مشتركة

### 4. **Type Safety**
- استخدام TypeScript بشكل شامل
- تعريف types صريحة لجميع البيانات
- استخدام Zod للتحقق من البيانات

---

## 🚀 خطوات التنفيذ

### المرحلة 1: الأساسيات ✅
- [x] إعداد قاعدة البيانات
- [x] إنشاء API routes
- [x] بناء المكون الأساسي

### المرحلة 2: إعادة الهيكلة (الجارية)
- [ ] إنشاء types
- [ ] إنشاء API client
- [ ] إنشاء custom hooks
- [ ] تقسيم المكونات

### المرحلة 3: التحسينات
- [ ] إضافة error boundaries
- [ ] تحسين الأداء (React.memo, useMemo)
- [ ] إضافة loading states أفضل
- [ ] تحسين error handling

### المرحلة 4: الميزات الإضافية
- [ ] البحث والفلترة
- [ ] التصدير (PDF/Excel)
- [ ] الإشعارات الفورية
- [ ] Offline support (PWA)
- [ ] Analytics dashboard

### المرحلة 5: الاختبار
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance testing

---

## 📊 Metrics و KPIs

### للمراقبة المستقبلية
- عدد المخالفات المفتوحة/المغلقة
- متوسط وقت إغلاق المخالفات
- عدد التصاريح الصادرة/المعلقة
- معدل الامتثال في الفحوصات
- عدد تقارير Near-Miss
- مؤشر الأمان العام

---

## 🔐 الأمان

### للتنفيذ المستقبلي
- Authentication & Authorization
- Role-based access control
- Audit logs
- Data encryption
- Rate limiting
- Input validation with Zod

---

## 📱 PWA Features

### للتنفيذ المستقبلي
- Service Worker
- Offline functionality
- Push notifications
- App manifest
- Install prompts

---

## 🎯 Best Practices المتبعة

1. **Code Organization**
   - Feature-based structure
   - Clear naming conventions
   - Consistent file structure

2. **Performance**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Caching strategies

3. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Color contrast

4. **Testing**
   - Component testing
   - API testing
   - E2E testing
   - Performance testing

---

## 📖 Documentation

### المستندات المطلوبة
- [ ] API Documentation (OpenAPI/Swagger)
- [ ] Component Storybook
- [ ] User Guide
- [ ] Developer Guide
- [ ] Deployment Guide

---

## 🔄 CI/CD Pipeline

### للتنفيذ المستقبلي
```yaml
stages:
  - lint
  - test
  - build
  - deploy

jobs:
  lint:
    - ESLint
    - Prettier check
  
  test:
    - Unit tests
    - Integration tests
  
  build:
    - Production build
    - Bundle analysis
  
  deploy:
    - Deploy to staging
    - Run E2E tests
    - Deploy to production
```

---

## 🎨 Design System

### للتنفيذ المستقبلي
- Color palette documentation
- Typography scale
- Spacing system
- Component library (Storybook)
- Design tokens

---

هذه خطة شاملة لتطوير التطبيق بشكل احترافي ومستدام. سنبدأ الآن بتنفيذ المرحلة 2 (إعادة الهيكلة).
