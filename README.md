# پروژه املاک - Real Estate Project

یک پروژه کامل Next.js برای مدیریت و نمایش املاک با پشتیبانی کامل از فارسی و RTL.

## ویژگی‌ها

- ✅ **پشتیبانی کامل فارسی و RTL**: تمام رابط کاربری به فارسی و با پشتیبانی کامل از راست به چپ
- ✅ **معماری متمرکز**: استفاده از XHR layer متمرکز برای تمام درخواست‌های API
- ✅ **مدیریت State با Jotai**: استفاده از Jotai به جای useState برای مدیریت state
- ✅ **سیستم مدیریت خطا**: سیستم جامع برای ثبت و نمایش خطاها
- ✅ **UI/UX مدرن**: طراحی تمیز و مدرن با Tailwind CSS
- ✅ **Responsive**: طراحی واکنش‌گرا برای تمام دستگاه‌ها
- ✅ **Loading States**: نمایش حالت‌های بارگذاری با Skeleton
- ✅ **TypeScript**: کد کاملاً تایپ شده

## ساختار پروژه

```
realstate1/
├── app/                          # صفحات Next.js App Router
│   ├── Home/                     # صفحه اصلی
│   │   ├── components/          # کامپوننت‌های صفحه اصلی
│   │   │   ├── hero.tsx         # بخش Hero
│   │   │   └── listprop.tsx     # لیست املاک
│   │   ├── page.tsx             # صفحه اصلی
│   │   └── page.api.ts          # API calls صفحه اصلی
│   ├── Prop/                     # صفحه فهرست املاک
│   │   ├── page.tsx
│   │   └── page.api.ts
│   ├── Detail/[id]/              # صفحه جزئیات ملک
│   │   ├── page.tsx
│   │   └── page.api.ts
│   ├── AboutUs/                  # صفحه درباره ما
│   ├── CommunicationUs/          # صفحه تماس با ما
│   ├── bookmark/                 # صفحه نشان‌گذاری‌ها
│   ├── layout.tsx                # Layout اصلی
│   └── globals.css               # استایل‌های全局
├── services/                     # سرویس‌های مشترک
│   ├── api/
│   │   └── xhr.ts               # XHR Layer متمرکز
│   ├── base/
│   │   └── atoms.ts             # Jotai Atoms
│   ├── err/
│   │   └── error.ts             # سیستم مدیریت خطا
│   └── components/              # کامپوننت‌های مشترک
│       ├── navbar.tsx           # نوار ناوبری
│       ├── footer.tsx           # فوتر
│       ├── mobilem.tsx         # منوی موبایل
│       └── ErrorMessage.tsx     # نمایش خطا
└── __tests__/                   # تست‌ها
    └── xhr.test.ts              # تست‌های XHR
```

## نصب و راه‌اندازی

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

## پیاده‌سازی RTL

RTL در چند سطح پیاده‌سازی شده است:

### 1. HTML Layout

در `app/layout.tsx`:

```tsx
<html lang="fa" dir="rtl">
```

### 2. فونت فارسی

استفاده از فونت Vazirmatn:

```tsx
const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-vazirmatn",
});
```

### 3. CSS Global

در `app/globals.css`:

```css
* {
  direction: rtl;
  text-align: right;
}
```

### 4. Tailwind RTL

استفاده از کلاس‌های Tailwind برای RTL:

- `space-x-reverse` برای فاصله‌گذاری معکوس
- `ml-*` و `mr-*` برای margin
- `pl-*` و `pr-*` برای padding

## استفاده از XHR Layer

تمام درخواست‌های API باید از طریق `services/api/xhr.ts` انجام شود.

### مثال استفاده:

```typescript
import xhr from "../../services/api/xhr";

// GET request
const data = await xhr.get("/api/properties", { page: 1 });

// POST request
const result = await xhr.post("/api/properties", {
  title: "ملک جدید",
  price: "1000000",
});

// با error handling
try {
  const data = await xhr.get("/api/properties");
} catch (error) {
  // error is already normalized
  console.error(error.message);
}
```

### متدهای موجود:

- `xhr.get<T>(endpoint, params?, config?)`
- `xhr.post<T>(endpoint, data?, config?)`
- `xhr.put<T>(endpoint, data?, config?)`
- `xhr.patch<T>(endpoint, data?, config?)`
- `xhr.delete<T>(endpoint, params?, config?)`

## سیستم مدیریت خطا

### ساختار خطا:

```typescript
interface XHRError {
  status: number;
  message: string;
  details?: any;
  raw?: any;
}
```

### ثبت خطا:

```typescript
import { logServerError } from "../../services/err/error";

try {
  await xhr.get("/api/properties");
} catch (error) {
  logServerError(error, {
    endpoint: "/api/properties",
    method: "GET",
    payload: params,
  });
}
```

### نمایش خطا به کاربر:

```tsx
import ErrorMessage from "../../services/components/ErrorMessage";

<ErrorMessage className="mb-6" onDismiss={() => setError(null)} />;
```

## استفاده از Jotai

تمام state مشترک در `services/base/atoms.ts` تعریف شده است.

### Atoms موجود:

```typescript
// Loading states
loadingAtom;
pageLoadingAtom;

// Error states
errorAtom;
globalErrorAtom;

// Properties
propertiesAtom;
selectedPropertyAtom;
filteredPropertiesAtom;

// UI states
mobileMenuOpenAtom;
searchQueryAtom;
filtersAtom;

// User/Auth
userAtom;
isAuthenticatedAtom;

// Bookmarks
bookmarksAtom;
```

### مثال استفاده:

```tsx
import { useAtom, useAtomValue } from "jotai";
import { propertiesAtom, loadingAtom } from "../../services/base/atoms";

function MyComponent() {
  const [properties, setProperties] = useAtom(propertiesAtom);
  const loading = useAtomValue(loadingAtom);

  // ...
}
```

## Page-Scoped API Files

هر صفحه که با backend ارتباط دارد باید فایل `page.api.ts` خود را داشته باشد.

### ساختار:

```typescript
// app/Prop/page.api.ts
import xhr from "../../services/api/xhr";
import { logServerError } from "../../services/err/error";

export async function fetchProperties(params) {
  try {
    return await xhr.get("/api/properties", params);
  } catch (error) {
    logServerError(error, {
      endpoint: "/api/properties",
      method: "GET",
      payload: params,
    });
    throw error;
  }
}
```

### استفاده در صفحه:

```tsx
// app/Prop/page.tsx
import { fetchProperties } from "./page.api";

useEffect(() => {
  const load = async () => {
    const data = await fetchProperties();
    setProperties(data);
  };
  load();
}, []);
```

## تست‌ها

تست‌ها در پوشه `__tests__` قرار دارند.

### اجرای تست‌ها:

```bash
npm test
```

### تست‌های موجود:

- **xhr.test.ts**: تست‌های XHR layer
  - تست درخواست‌های موفق
  - تست مدیریت خطا (4xx, 5xx)
  - تست ثبت خطا

## متغیرهای محیطی

ایجاد فایل `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

## تکنولوژی‌های استفاده شده

- **Next.js 16**: Framework React
- **React 19**: کتابخانه UI
- **TypeScript**: تایپ‌اسکریپت
- **Tailwind CSS 4**: استایل‌دهی
- **Jotai**: مدیریت state
- **Vazirmatn**: فونت فارسی

## ساختار کامپوننت‌ها

### کامپوننت‌های مشترک:

- **Navbar**: نوار ناوبری با منوی موبایل
- **Footer**: فوتر سایت
- **MobileMenu**: منوی موبایل
- **ErrorMessage**: نمایش خطاها

### کامپوننت‌های صفحه اصلی:

- **Hero**: بخش Hero با تصویر خانه
- **ListProp**: لیست املاک با loading skeleton

## نکات مهم

1. **هرگز از fetch مستقیم استفاده نکنید**: همیشه از `xhr` استفاده کنید
2. **همه state در Jotai**: از `useState` فقط برای state محلی استفاده کنید
3. **Page API Files**: هر صفحه API file خود را داشته باشد
4. **Error Handling**: همیشه خطاها را log کنید
5. **RTL Support**: همیشه RTL را در نظر بگیرید

## توسعه بیشتر

### اضافه کردن صفحه جدید:

1. ایجاد پوشه در `app/`
2. ایجاد `page.tsx`
3. ایجاد `page.api.ts` برای API calls
4. استفاده از atoms موجود یا ایجاد atom جدید

### اضافه کردن Atom جدید:

در `services/base/atoms.ts`:

```typescript
export const myNewAtom = atom<MyType>(initialValue);
```

## مجوز

این پروژه برای استفاده شخصی و تجاری آزاد است.

## پشتیبانی

برای سوالات و مشکلات، لطفاً issue ایجاد کنید.
