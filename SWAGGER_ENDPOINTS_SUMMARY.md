# Swagger Endpoints Summary

## 📋 Extracted Endpoints

This document lists all API endpoints that have been integrated into the frontend.

### 🔵 Properties Module

| Method | Endpoint | Function | File |
|--------|----------|----------|------|
| GET | `/api/properties/` | `getProperties(params)` | `app/properties/api/getProperties.js` |
| GET | `/api/properties/{id}/` | `getPropertyById(id)` | `app/properties/api/getPropertyById.js` |
| POST | `/api/properties/` | `createProperty(data)` | `app/properties/api/createProperty.js` |
| PUT | `/api/properties/{id}/` | `updateProperty(id, data)` | `app/properties/api/updateProperty.js` |
| PATCH | `/api/properties/{id}/` | `patchProperty(id, data)` | `app/properties/api/patchProperty.js` |
| DELETE | `/api/properties/{id}/` | `deleteProperty(id)` | `app/properties/api/deleteProperty.js` |
| GET | `/api/properties/featured/` | `getFeaturedProperties(params)` | `app/properties/api/getFeaturedProperties.js` |
| GET | `/api/properties/search/` | `searchProperties(params)` | `app/properties/api/searchProperties.js` |

**Query Parameters:**
- `page` - Page number
- `limit` - Items per page
- `search` - Search query
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `bedrooms` - Number of bedrooms
- `bathrooms` - Number of bathrooms
- `propertyType` - Property type filter
- `category` - Category filter
- `location` - Location filter

**Request Body (Create/Update):**
```javascript
{
  title: string,
  location: string,
  price: string,
  bedrooms: number,
  bathrooms: number,
  area: string,
  description?: string,
  type?: string,
  status?: "available" | "sold" | "rented",
  image?: string,
  category_id?: number
}
```

**Response Schema:**
```javascript
{
  id: number,
  title: string,
  location: string,
  price: string,
  bedrooms: number,
  bathrooms: number,
  area: string,
  image?: string,
  description?: string,
  type?: string,
  status?: string,
  created_at?: string,
  updated_at?: string
}
```

---

### 👥 Users Module

| Method | Endpoint | Function | File |
|--------|----------|----------|------|
| GET | `/api/users/` | `getUsers(params)` | `app/users/api/getUsers.js` |
| GET | `/api/users/{id}/` | `getUserById(id)` | `app/users/api/getUserById.js` |
| GET | `/api/users/me/` | `getCurrentUser()` | `app/users/api/getCurrentUser.js` |
| PUT | `/api/users/{id}/` | `updateUser(id, data)` | `app/users/api/updateUser.js` |

**Query Parameters:**
- `page` - Page number
- `limit` - Items per page
- `search` - Search query

**Request Body (Update):**
```javascript
{
  name?: string,
  email?: string,
  avatar?: string,
  phone?: string
}
```

**Response Schema:**
```javascript
{
  id: number,
  name: string,
  email: string,
  avatar?: string,
  phone?: string,
  created_at?: string
}
```

---

### 🔐 Authentication Module

| Method | Endpoint | Function | File |
|--------|----------|----------|------|
| POST | `/api/auth/login/` | `login(credentials)` | `app/auth/api/login.js` |
| POST | `/api/auth/register/` | `register(userData)` | `app/auth/api/register.js` |
| POST | `/api/auth/logout/` | `logout()` | `app/auth/api/logout.js` |
| POST | `/api/auth/refresh/` | `refreshToken(refreshToken)` | `app/auth/api/refreshToken.js` |

**Request Body (Login):**
```javascript
{
  email: string,
  password: string
}
```

**Request Body (Register):**
```javascript
{
  name: string,
  email: string,
  password: string,
  password_confirmation?: string
}
```

**Response Schema (Login/Register):**
```javascript
{
  token?: string,
  access?: string,
  refresh?: string,
  user?: {
    id: number,
    name: string,
    email: string
  }
}
```

**Authentication:**
- Token stored in `localStorage` as `auth_token`
- Automatically added to requests via `Authorization: Bearer {token}` header
- Removed on 401 errors

---

### 📂 Categories Module

| Method | Endpoint | Function | File |
|--------|----------|----------|------|
| GET | `/api/categories/` | `getCategories(params)` | `app/categories/api/getCategories.js` |
| GET | `/api/categories/{id}/` | `getCategoryById(id)` | `app/categories/api/getCategoryById.js` |

**Query Parameters:**
- `page` - Page number
- `limit` - Items per page

**Response Schema:**
```javascript
{
  id: number,
  name: string,
  slug?: string,
  description?: string,
  icon?: string
}
```

---

### ⭐ Bookmarks Module

| Method | Endpoint | Function | File |
|--------|----------|----------|------|
| GET | `/api/bookmarks/` | `getBookmarks(params)` | `app/bookmarks/api/getBookmarks.js` |
| POST | `/api/bookmarks/` | `addBookmark(propertyId)` | `app/bookmarks/api/addBookmark.js` |
| DELETE | `/api/bookmarks/{id}/` | `removeBookmark(id)` | `app/bookmarks/api/removeBookmark.js` |

**Request Body (Add Bookmark):**
```javascript
{
  property_id: number
}
```

**Response Schema:**
```javascript
{
  id: number,
  property_id: number,
  user_id: number,
  created_at: string
}
```

**Authentication:** Required

---

### 💬 Messages Module

| Method | Endpoint | Function | File |
|--------|----------|----------|------|
| GET | `/api/messages/` | `getMessages(params)` | `app/messages/api/getMessages.js` |
| POST | `/api/messages/` | `sendMessage(messageData)` | `app/messages/api/sendMessage.js` |
| GET | `/api/messages/{id}/` | `getMessageById(id)` | `app/messages/api/getMessageById.js` |

**Request Body (Send Message):**
```javascript
{
  property_id?: number,
  subject: string,
  message: string,
  sender_name?: string,
  sender_email?: string,
  sender_phone?: string
}
```

**Response Schema:**
```javascript
{
  id: number,
  property_id?: number,
  subject: string,
  message: string,
  sender_name?: string,
  sender_email?: string,
  sender_phone?: string,
  read: boolean,
  created_at: string
}
```

---

### 🖼️ Images Module

| Method | Endpoint | Function | File |
|--------|----------|----------|------|
| POST | `/api/images/upload/` | `uploadImage(file, propertyId)` | `app/images/api/uploadImage.js` |
| DELETE | `/api/images/{id}/` | `deleteImage(id)` | `app/images/api/deleteImage.js` |

**Request (Upload):**
- `multipart/form-data`
- `file` - Image file
- `property_id` (optional) - Associated property ID

**Response Schema:**
```javascript
{
  id: number,
  url: string,
  property_id?: number,
  created_at: string
}
```

**Authentication:** Required for upload/delete

---

## 🔧 Configuration

### Base URL
- Default: `http://localhost:8000/api/`
- Environment Variable: `NEXT_PUBLIC_API_BASE_URL`

### Timeout
- Default: 30000ms (30 seconds)

### Headers
- `Content-Type: application/json`
- `Accept: application/json`
- `Authorization: Bearer {token}` (when authenticated)

---

## 📝 Notes

1. All endpoints return JSON responses
2. Error responses follow standard HTTP status codes
3. Authentication tokens are automatically managed
4. Query parameters are optional unless specified
5. All endpoints support error handling via try/catch

---

## 🔄 Next Steps

To integrate with actual Swagger documentation:

1. Open Swagger UI at `http://localhost:8000/api/schema/swagger-ui/`
2. Compare endpoints with this document
3. Update API files with actual request/response schemas
4. Add any missing endpoints
5. Update TypeScript interfaces if needed

