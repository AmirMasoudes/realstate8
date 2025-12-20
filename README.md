# پروژه املاک - Real Estate Project

یک پروژه کامل Next.js برای مدیریت و نمایش املاک با پشتیبانی کامل از فارسی و RTL.

## 📋 فهرست مطالب

- [ویژگی‌ها](#ویژگی‌ها)
- [ساختار کامل پروژه](#ساختار-کامل-پروژه)
- [نصب و راه‌اندازی](#نصب-و-راه‌اندازی)
- [معماری پروژه](#معماری-پروژه)
- [استفاده از API](#استفاده-از-api)
- [مدیریت State](#مدیریت-state)
- [سیستم مدیریت خطا](#سیستم-مدیریت-خطا)
- [تکنولوژی‌ها](#تکنولوژی‌ها)

## ✨ ویژگی‌ها

- ✅ **پشتیبانی کامل فارسی و RTL**: تمام رابط کاربری به فارسی و با پشتیبانی کامل از راست به چپ
- ✅ **فونت Vazir**: فونت فارسی Vazir در کل سایت
- ✅ **معماری متمرکز**: استفاده از XHR layer متمرکز برای تمام درخواست‌های API
- ✅ **مدیریت State با Jotai**: استفاده از Jotai برای مدیریت state
- ✅ **سیستم مدیریت خطا**: سیستم جامع برای ثبت و نمایش خطاها
- ✅ **UI/UX مدرن**: طراحی تمیز و مدرن با Tailwind CSS
- ✅ **Responsive**: طراحی واکنش‌گرا برای تمام دستگاه‌ها
- ✅ **Loading States**: نمایش حالت‌های بارگذاری با Skeleton
- ✅ **TypeScript**: کد کاملاً تایپ شده
- ✅ **ساختار استاندارد**: هر صفحه دارای atom، hooks، api و components

## 📁 ساختار کامل پروژه

```
realestate-frontend-8/
│
├── app/                                    # صفحات Next.js App Router
│   ├── layout.tsx                         # Layout اصلی با Navbar و Footer
│   ├── page.tsx                           # صفحه اصلی (redirect به Home)
│   ├── globals.css                        # استایل‌های全局 و فونت Vazir
│   ├── fonts.css                          # تعریف فونت Vazir از CDN
│   ├── error.tsx                          # صفحه خطای عمومی
│   ├── global-error.tsx                   # صفحه خطای Global
│   ├── not-found.tsx                      # صفحه 404
│   │
│   ├── Home/                              # صفحه اصلی
│   │   ├── page.tsx                       # صفحه اصلی Home
│   │   ├── api/                           # API functions
│   │   │   ├── getProperties.ts           # دریافت لیست properties
│   │   │   ├── page.api.ts                # API wrapper
│   │   │   ├── toggleBookmark.ts          # مدیریت bookmark
│   │   │   └── toggleLike.ts              # مدیریت like
│   │   ├── atom/                          # State management
│   │   │   └── atom.tsx                   # Atoms مخصوص Home
│   │   ├── hooks/                         # Custom hooks
│   │   │   └── useHomeProperties.ts       # Hook برای fetch properties
│   │   └── components/                    # کامپوننت‌های UI
│   │       ├── hero.tsx                   # بخش Hero با تصویر خانه
│   │       ├── listprop.tsx               # لیست properties
│   │       └── PropertyCard.tsx            # کارت نمایش property
│   │
│   ├── properties/                        # صفحه فهرست املاک
│   │   ├── page.tsx                       # صفحه اصلی properties
│   │   ├── api/                           # API functions
│   │   │   ├── getFilteredProperties.ts   # دریافت filtered properties
│   │   │   ├── getPropertyById.ts         # دریافت property با ID
│   │   │   └── page.api.ts                # API wrapper
│   │   ├── atom/                          # State management
│   │   │   └── atom.tsx                   # Atoms مخصوص properties
│   │   ├── hooks/                         # Custom hooks
│   │   │   └── useFilteredProperties.ts  # Hook برای filtered properties
│   │   └── components/                    # کامپوننت‌های UI
│   │       ├── FilterPanel.tsx           # پنل فیلتر
│   │       └── FilteredPropertyCard.tsx   # کارت property با فیلتر
│   │
│   ├── Detail/                            # صفحه جزئیات ملک
│   │   ├── [id]/                          # Dynamic route
│   │   │   ├── page.tsx                   # صفحه جزئیات
│   │   │   └── page.api.ts                # API برای fetch property
│   │   ├── api/                           # API functions
│   │   │   └── page.api.ts                # API wrapper
│   │   ├── atom/                          # State management
│   │   │   └── atom.tsx                   # Atoms مخصوص Detail
│   │   └── hooks/                         # Custom hooks
│   │       └── usePropertyDetail.ts      # Hook برای property detail
│   │
│   ├── Map/                               # صفحه نقشه
│   │   ├── page.tsx                       # صفحه اصلی Map
│   │   ├── api/                           # API functions
│   │   │   ├── getProperties.ts           # دریافت properties
│   │   │   ├── getPropertyById.ts         # دریافت property
│   │   │   ├── createProperty.ts          # ایجاد property
│   │   │   ├── updateProperty.ts          # به‌روزرسانی property
│   │   │   ├── deleteProperty.ts          # حذف property
│   │   │   ├── searchProperties.ts        # جستجوی properties
│   │   │   ├── getFeaturedProperties.ts   # دریافت featured properties
│   │   │   ├── index.ts                   # Barrel export
│   │   │   └── page.api.ts                # API wrapper
│   │   ├── atom/                          # State management
│   │   │   └── atom.tsx                   # Atoms مخصوص Map
│   │   ├── hooks/                         # Custom hooks
│   │   │   ├── useMapState.ts             # Hook برای map state
│   │   │   └── useFetchHouses.ts          # Hook برای fetch houses
│   │   └── components/                    # کامپوننت‌های UI
│   │       ├── map/                       # کامپوننت‌های نقشه
│   │       │   └── MapContainer.tsx       # Container اصلی نقشه
│   │       ├── filters/                   # کامپوننت‌های فیلتر
│   │       │   └── FilterPanel.tsx        # پنل فیلتر
│   │       ├── properties/                # کامپوننت‌های properties
│   │       │   ├── PropertiesList.tsx     # لیست properties
│   │       │   └── PropertyCard.tsx       # کارت property
│   │       ├── PropertyDetail.tsx         # جزئیات property
│   │       └── ui/                        # کامپوننت‌های UI
│   │           └── LoadingSkeleton.tsx    # Skeleton loading
│   │
│   ├── bookmarks/                        # صفحه نشان‌گذاری‌ها
│   │   ├── page.tsx                       # صفحه اصلی bookmarks
│   │   ├── api/                           # API functions
│   │   │   ├── getBookmarks.ts            # دریافت bookmarks
│   │   │   ├── addBookmark.ts             # افزودن bookmark
│   │   │   ├── removeBookmark.ts          # حذف bookmark
│   │   │   ├── index.ts                   # Barrel export
│   │   │   └── page.api.ts                # API wrapper
│   │   ├── atom/                          # State management
│   │   │   └── atom.tsx                   # Atoms مخصوص bookmarks
│   │   ├── hooks/                         # Custom hooks
│   │   │   └── useBookmarks.ts            # Hook برای bookmarks
│   │   └── components/                    # کامپوننت‌های UI
│   │       └── BookmarkButton.tsx         # دکمه bookmark
│   │
│   ├── AboutUs/                           # صفحه درباره ما
│   │   ├── page.tsx                       # صفحه اصلی AboutUs
│   │   ├── api/                           # API functions
│   │   │   └── page.api.ts                # API wrapper
│   │   ├── atom/                          # State management
│   │   │   └── atom.tsx                   # Atoms مخصوص AboutUs
│   │   ├── hooks/                         # Custom hooks
│   │   │   └── useAboutUs.ts              # Hook برای AboutUs
│   │   └── components/                    # کامپوننت‌های UI (خالی)
│   │
│   ├── CommunicationUs/                   # صفحه تماس با ما
│   │   ├── page.tsx                       # صفحه اصلی Contact
│   │   ├── api/                           # API functions
│   │   │   └── page.api.ts                # API برای ارسال فرم
│   │   ├── atom/                          # State management
│   │   │   └── atom.tsx                   # Atoms مخصوص Contact
│   │   └── hooks/                         # Custom hooks
│   │       └── useContactForm.ts          # Hook برای فرم تماس
│   │
│   ├── categories/                        # API برای categories
│   │   ├── api/                           # API functions
│   │   │   ├── getCategories.ts           # دریافت categories
│   │   │   ├── getCategoryById.ts         # دریافت category با ID
│   │   │   ├── index.ts                   # Barrel export
│   │   │   └── page.api.ts                # API wrapper
│   │   ├── atom/                          # State management
│   │   │   └── atom.tsx                   # Atoms مخصوص categories
│   │   └── hooks/                         # Custom hooks
│   │       ├── useCategories.ts           # Hook برای لیست categories
│   │       └── useCategory.ts             # Hook برای یک category
│   │
│   ├── messages/                          # API برای messages
│   │   ├── api/                           # API functions
│   │   │   ├── getMessages.ts             # دریافت messages
│   │   │   ├── getMessageById.ts          # دریافت message با ID
│   │   │   ├── sendMessage.ts             # ارسال message
│   │   │   ├── index.ts                   # Barrel export
│   │   │   └── page.api.ts                # API wrapper
│   │   ├── atom/                          # State management
│   │   │   └── atom.tsx                   # Atoms مخصوص messages
│   │   └── hooks/                         # Custom hooks
│   │       ├── useMessages.ts             # Hook برای لیست messages
│   │       ├── useMessage.ts              # Hook برای یک message
│   │       └── useSendMessage.ts           # Hook برای ارسال message
│   │
│   ├── users/                             # API برای users
│   │   ├── api/                           # API functions
│   │   │   ├── getUsers.ts                # دریافت users
│   │   │   ├── getUserById.ts             # دریافت user با ID
│   │   │   ├── getCurrentUser.ts           # دریافت user فعلی
│   │   │   ├── updateUser.ts              # به‌روزرسانی user
│   │   │   ├── index.ts                   # Barrel export
│   │   │   └── page.api.ts                # API wrapper
│   │   ├── atom/                          # State management
│   │   │   └── atom.tsx                   # Atoms مخصوص users
│   │   └── hooks/                         # Custom hooks
│   │       ├── useUsers.ts                # Hook برای لیست users
│   │       ├── useUser.ts                 # Hook برای یک user
│   │       ├── useCurrentUser.ts          # Hook برای user فعلی
│   │       └── useUpdateUser.ts           # Hook برای به‌روزرسانی user
│   │
│   └── components/                        # کامپوننت‌های مشترک
│       └── ErrorDisplay.tsx               # کامپوننت نمایش خطا
│
├── services/                              # سرویس‌های مشترک
│   ├── api/                               # API Layer
│   │   └── xhr.ts                         # XHR Layer متمرکز (Axios wrapper)
│   │
│   ├── atoms/                             # Global Atoms
│   │   ├── baseAtoms.ts                   # Base atoms (User, Category, Message, etc.)
│   │   └── propertiesAtom.ts              # Properties atoms
│   │
│   ├── base/                              # Base utilities
│   │   └── atoms.ts                       # Legacy atoms (deprecated)
│   │
│   ├── auth/                              # Authentication
│   │   ├── api/                           # Auth API functions
│   │   │   ├── login.ts                   # ورود
│   │   │   ├── register.ts                # ثبت‌نام
│   │   │   ├── logout.ts                  # خروج
│   │   │   ├── refreshToken.ts            # Refresh token
│   │   │   └── index.ts                   # Barrel export
│   │   └── components/                    # Auth components
│   │       └── LoginForm.tsx              # فرم ورود
│   │
│   ├── components/                        # کامپوننت‌های مشترک
│   │   ├── navbar.tsx                     # نوار ناوبری
│   │   ├── footer.tsx                     # فوتر
│   │   ├── mobilem.tsx                    # منوی موبایل
│   │   └── ErrorMessage.tsx               # نمایش خطا
│   │
│   ├── err/                               # Error Handling
│   │   ├── error.ts                       # Legacy error handling
│   │   ├── errorHandler.ts                # Error handler utilities
│   │   ├── errorTypes.ts                  # Error type definitions
│   │   └── useError.ts                    # React hook برای error handling
│   │
│   └── utils/                             # Utility functions
│       ├── formatters.ts                  # Formatting utilities (price, area, number)
│       ├── queryString.ts                 # Query string utilities
│       ├── toastManager.ts                # Toast notification manager
│       └── useDebounce.ts                 # Debounce hook
│
├── __tests__/                             # تست‌ها
│   └── xhr.test.ts                        # تست‌های XHR layer
│
├── public/                                # فایل‌های استاتیک
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── package.json                           # وابستگی‌ها و scripts
├── tsconfig.json                          # تنظیمات TypeScript
├── next.config.ts                         # تنظیمات Next.js
├── postcss.config.mjs                     # تنظیمات PostCSS
├── eslint.config.mjs                     # تنظیمات ESLint
└── README.md                              # این فایل
```

## 🏗️ ساختار استاندارد هر صفحه

هر صفحه در پروژه از ساختار استاندارد زیر پیروی می‌کند:

```
app/[PageName]/
├── page.tsx              # صفحه اصلی
├── api/                   # فایل‌های API
│   ├── page.api.ts        # API wrapper (re-exports)
│   └── [other-api-files]  # API functions
├── atom/                  # State management (Jotai atoms)
│   └── atom.tsx           # Atoms مخصوص این صفحه
├── components/            # کامپوننت‌های UI
│   └── [components]       # کامپوننت‌های صفحه
└── hooks/                 # Custom hooks
    └── [hooks]            # Hooks مخصوص این صفحه
```

### مثال: ساختار Home

```
app/Home/
├── page.tsx                    # صفحه اصلی Home
├── api/
│   ├── getProperties.ts        # دریافت لیست properties
│   ├── page.api.ts             # API wrapper
│   ├── toggleBookmark.ts       # مدیریت bookmark
│   └── toggleLike.ts           # مدیریت like
├── atom/
│   └── atom.tsx                # Atoms: propertiesListAtom, loadingAtom, etc.
├── hooks/
│   └── useHomeProperties.ts    # Hook: fetch properties, loading, error
└── components/
    ├── hero.tsx                # بخش Hero
    ├── listprop.tsx            # لیست properties
    └── PropertyCard.tsx        # کارت property
```

## 🚀 نصب و راه‌اندازی

### پیش‌نیازها

- Node.js 18+
- npm یا yarn

### نصب

```bash
# نصب وابستگی‌ها
npm install

# یا
yarn install
```

### اجرای پروژه

```bash
# حالت توسعه
npm run dev

# ساخت برای production
npm run build

# اجرای production
npm start
```

پروژه در آدرس `http://localhost:3000` در دسترس خواهد بود.

### متغیرهای محیطی

ایجاد فایل `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

## 🏛️ معماری پروژه

### 1. XHR Layer (API Layer)

تمام درخواست‌های API از طریق `services/api/xhr.ts` انجام می‌شود.

**مزایا:**
- مدیریت متمرکز خطاها
- اضافه کردن token به صورت خودکار
- Normalize کردن response ها
- Toast notifications خودکار

**استفاده:**

```typescript
import xhr from "@/services/api/xhr";

// GET request
const data = await xhr.get<Property[]>("properties/", params);

// POST request
const result = await xhr.post<Property>("properties/", {
  title: "ملک جدید",
  price: 1000000,
});

// PUT request
const updated = await xhr.put<Property>(`properties/${id}/`, data);

// DELETE request
await xhr.delete(`properties/${id}/`);
```

### 2. State Management (Jotai)

تمام state مشترک در `services/atoms/` تعریف شده است.

**Base Atoms** (`services/atoms/baseAtoms.ts`):
- User, Category, Message interfaces
- Global loading, error states
- UI states (mobile menu, search, etc.)

**Properties Atoms** (`services/atoms/propertiesAtom.ts`):
- Properties list
- Filtered properties
- Filters state
- Pagination
- Like/Bookmark states

**Page-Specific Atoms** (`app/[Page]/atom/atom.tsx`):
- Atoms مخصوص هر صفحه
- Derived atoms
- Local state management

**استفاده:**

```typescript
import { useAtom, useAtomValue } from "jotai";
import { propertiesListAtom } from "@/app/Home/atom/atom";

function MyComponent() {
  const [properties, setProperties] = useAtom(propertiesListAtom);
  const loading = useAtomValue(propertiesLoadingAtom);
  // ...
}
```

### 3. Custom Hooks

هر صفحه hooks مخصوص خود را دارد:

**مثال: `useHomeProperties`**

```typescript
import { useHomeProperties } from "@/app/Home/hooks/useHomeProperties";

function HomePage() {
  const { properties, loading, error, refetch } = useHomeProperties();
  // ...
}
```

**ویژگی‌های Hooks:**
- مدیریت loading و error
- Fetch data
- Refetch functionality
- Integration با error handling

### 4. Error Handling

سیستم مدیریت خطا در `services/err/` قرار دارد.

**استفاده:**

```typescript
import { useError } from "@/services/err/useError";

function MyComponent() {
  const { handleError, clearError } = useError();
  
  try {
    await someApiCall();
  } catch (err) {
    handleError(err, { showToast: true });
  }
}
```

**Error Types:**
- `ApiError`: خطاهای API
- `ValidationError`: خطاهای validation
- `XHRError`: خطاهای XHR

## 📡 استفاده از API

### ساختار API Files

هر صفحه دارای `api/page.api.ts` است که به عنوان wrapper عمل می‌کند:

```typescript
// app/Home/api/page.api.ts
export { getProperties } from "./getProperties";
export { toggleLike } from "./toggleLike";
export { toggleBookmark } from "./toggleBookmark";
```

### مثال API Function

```typescript
// app/Home/api/getProperties.ts
import xhr from "../../../services/api/xhr";
import { Property } from "../../../services/base/atoms";
import { extractError } from "../../../services/err/errorHandler";

export async function getProperties(): Promise<Property[]> {
  try {
    const response = await xhr.get<Property[]>("properties/");
    return Array.isArray(response) ? response : response.results || [];
  } catch (err) {
    throw extractError(err);
  }
}
```

## 🎨 UI Components

### کامپوننت‌های مشترک

- **Navbar**: نوار ناوبری با منوی موبایل
- **Footer**: فوتر سایت
- **MobileMenu**: منوی موبایل
- **ErrorMessage**: نمایش خطاها
- **ErrorDisplay**: کامپوننت زیبا برای نمایش خطا

### کامپوننت‌های صفحه

هر صفحه کامپوننت‌های مخصوص خود را دارد که در `components/` قرار دارند.

## 🎯 تکنولوژی‌ها

- **Next.js 16**: Framework React با App Router
- **React 19**: کتابخانه UI
- **TypeScript**: تایپ‌اسکریپت برای type safety
- **Tailwind CSS 4**: استایل‌دهی utility-first
- **Jotai**: مدیریت state
- **Axios**: HTTP client
- **React Hot Toast**: Toast notifications
- **Mapbox GL**: نقشه‌های تعاملی
- **Supercluster**: Clustering برای markers
- **Vazir Font**: فونت فارسی

## 📝 نکات مهم

1. **هرگز از fetch مستقیم استفاده نکنید**: همیشه از `xhr` استفاده کنید
2. **همه state در Jotai**: از `useState` فقط برای state محلی استفاده کنید
3. **ساختار استاندارد**: هر صفحه باید ساختار استاندارد داشته باشد
4. **Page API Files**: هر صفحه API file خود را داشته باشد
5. **Error Handling**: همیشه خطاها را handle کنید
6. **RTL Support**: همیشه RTL را در نظر بگیرید
7. **TypeScript**: همه فایل‌ها باید type داشته باشند

## 🔧 توسعه بیشتر

### اضافه کردن صفحه جدید

1. ایجاد پوشه در `app/`
2. ایجاد `page.tsx`
3. ایجاد `api/page.api.ts` برای API calls
4. ایجاد `atom/atom.tsx` برای state management
5. ایجاد `hooks/` برای custom hooks
6. ایجاد `components/` برای UI components

### اضافه کردن Atom جدید

در `app/[Page]/atom/atom.tsx`:

```typescript
import { atom } from "jotai";

export const myNewAtom = atom<MyType>(initialValue);
```

### اضافه کردن Hook جدید

در `app/[Page]/hooks/useMyHook.ts`:

```typescript
import { useAtom } from "jotai";
import { myAtom } from "../atom/atom";

export function useMyHook() {
  const [value, setValue] = useAtom(myAtom);
  // ...
  return { value, setValue };
}
```

## 📄 مجوز

این پروژه برای استفاده شخصی و تجاری آزاد است.

## 🆘 پشتیبانی

برای سوالات و مشکلات، لطفاً issue ایجاد کنید.
