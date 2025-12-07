# API Integration Guide

## 📁 Folder Structure

```
app/
├── properties/
│   ├── api/
│   │   ├── getProperties.js
│   │   ├── getPropertyById.js
│   │   ├── createProperty.js
│   │   ├── updateProperty.js
│   │   ├── patchProperty.js
│   │   ├── deleteProperty.js
│   │   ├── getFeaturedProperties.js
│   │   └── searchProperties.js
│   └── components/
│       ├── PropertiesList.jsx
│       └── PropertyDetail.jsx
├── users/
│   └── api/
│       ├── getUsers.js
│       ├── getUserById.js
│       ├── getCurrentUser.js
│       └── updateUser.js
├── auth/
│   ├── api/
│   │   ├── login.js
│   │   ├── register.js
│   │   ├── logout.js
│   │   └── refreshToken.js
│   └── components/
│       └── LoginForm.jsx
├── categories/
│   └── api/
│       ├── getCategories.js
│       └── getCategoryById.js
├── bookmarks/
│   ├── api/
│   │   ├── getBookmarks.js
│   │   ├── addBookmark.js
│   │   └── removeBookmark.js
│   └── components/
│       └── BookmarkButton.jsx
├── messages/
│   └── api/
│       ├── getMessages.js
│       ├── sendMessage.js
│       └── getMessageById.js
└── images/
    └── api/
        ├── uploadImage.js
        └── deleteImage.js

services/
├── xhr.js                    # Axios instance
└── atoms/
    └── baseAtoms.js          # Jotai atoms
```

## 🔧 Configuration

### Base URL Setup

The API base URL is configured in `services/xhr.js`:

```javascript
baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/"
```

Set environment variable in `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/
```

### Authentication

Authentication tokens are automatically handled:
- Token is stored in `localStorage` as `auth_token`
- Token is automatically added to requests via Authorization header
- Token is removed on 401 errors

## 📚 Usage Examples

### 1. Using API Functions

```javascript
import { getProperties } from "@/app/properties/api/getProperties";

// In your component
const fetchData = async () => {
  try {
    const properties = await getProperties({
      page: 1,
      limit: 12,
      search: "apartment",
    });
    console.log(properties);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

### 2. Using with Jotai Atoms

```javascript
"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  propertiesListAtom,
  propertiesLoadingAtom,
  propertiesErrorAtom,
} from "@/services/atoms/baseAtoms";
import { getProperties } from "@/app/properties/api/getProperties";

export default function MyComponent() {
  const [properties, setProperties] = useAtom(propertiesListAtom);
  const [loading, setLoading] = useAtom(propertiesLoadingAtom);
  const [error, setError] = useAtom(propertiesErrorAtom);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (err) {
        setError({
          message: err.response?.data?.message || "خطا در دریافت اطلاعات",
          status: err.response?.status || 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setProperties, setLoading, setError]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {properties.map((property) => (
        <div key={property.id}>{property.title}</div>
      ))}
    </div>
  );
}
```

### 3. Creating New Property

```javascript
import { createProperty } from "@/app/properties/api/createProperty";

const handleCreate = async () => {
  try {
    const newProperty = await createProperty({
      title: "آپارتمان 100 متری",
      location: "تهران",
      price: "5000000000",
      bedrooms: 2,
      bathrooms: 1,
      area: "100",
    });
    console.log("Created:", newProperty);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

### 4. Authentication

```javascript
import { login } from "@/app/auth/api/login";
import { getCurrentUser } from "@/app/users/api/getCurrentUser";
import { useAtom } from "jotai";
import { isAuthenticatedAtom, currentUserAtom } from "@/services/atoms/baseAtoms";

const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

const handleLogin = async (email, password) => {
  try {
    const response = await login({ email, password });
    setIsAuthenticated(true);
    const userData = await getCurrentUser();
    setCurrentUser(userData);
  } catch (error) {
    console.error("Login failed:", error);
  }
};
```

### 5. Bookmarks

```javascript
import { addBookmark, removeBookmark } from "@/app/bookmarks/api";
import { useAtom } from "jotai";
import { bookmarkedPropertyIdsAtom } from "@/services/atoms/baseAtoms";

const [bookmarkedIds, setBookmarkedIds] = useAtom(bookmarkedPropertyIdsAtom);

const toggleBookmark = async (propertyId) => {
  if (bookmarkedIds.includes(propertyId)) {
    await removeBookmark(propertyId);
    setBookmarkedIds(bookmarkedIds.filter(id => id !== propertyId));
  } else {
    await addBookmark(propertyId);
    setBookmarkedIds([...bookmarkedIds, propertyId]);
  }
};
```

## 🎯 Available API Endpoints

### Properties
- `GET /api/properties/` - List properties
- `GET /api/properties/{id}/` - Get property by ID
- `POST /api/properties/` - Create property
- `PUT /api/properties/{id}/` - Update property
- `PATCH /api/properties/{id}/` - Partial update
- `DELETE /api/properties/{id}/` - Delete property
- `GET /api/properties/featured/` - Featured properties
- `GET /api/properties/search/` - Search properties

### Users
- `GET /api/users/` - List users
- `GET /api/users/{id}/` - Get user by ID
- `GET /api/users/me/` - Get current user
- `PUT /api/users/{id}/` - Update user

### Auth
- `POST /api/auth/login/` - Login
- `POST /api/auth/register/` - Register
- `POST /api/auth/logout/` - Logout
- `POST /api/auth/refresh/` - Refresh token

### Categories
- `GET /api/categories/` - List categories
- `GET /api/categories/{id}/` - Get category by ID

### Bookmarks
- `GET /api/bookmarks/` - Get bookmarks
- `POST /api/bookmarks/` - Add bookmark
- `DELETE /api/bookmarks/{id}/` - Remove bookmark

### Messages
- `GET /api/messages/` - Get messages
- `POST /api/messages/` - Send message
- `GET /api/messages/{id}/` - Get message by ID

### Images
- `POST /api/images/upload/` - Upload image
- `DELETE /api/images/{id}/` - Delete image

## 🔄 Updating Atoms

### Properties
```javascript
import { useAtom } from "jotai";
import {
  propertiesListAtom,
  selectedPropertyAtom,
  propertiesLoadingAtom,
  propertiesErrorAtom,
} from "@/services/atoms/baseAtoms";

const [properties, setProperties] = useAtom(propertiesListAtom);
const [property, setProperty] = useAtom(selectedPropertyAtom);
const [loading, setLoading] = useAtom(propertiesLoadingAtom);
const [error, setError] = useAtom(propertiesErrorAtom);
```

### Users
```javascript
import {
  usersListAtom,
  currentUserAtom,
  isAuthenticatedAtom,
} from "@/services/atoms/baseAtoms";
```

### Filters & Search
```javascript
import {
  searchQueryAtom,
  filtersAtom,
  filteredPropertiesWithSearchAtom,
} from "@/services/atoms/baseAtoms";

const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
const [filters, setFilters] = useAtom(filtersAtom);
const [filteredProperties] = useAtom(filteredPropertiesWithSearchAtom);
```

## 🛠️ Error Handling

All API functions throw errors that can be caught:

```javascript
try {
  const data = await getProperties();
} catch (error) {
  // error.response.status - HTTP status code
  // error.response.data.message - Error message
  // error.response.data.details - Error details
  console.error("Error:", error.response?.data?.message);
}
```

## 📝 Notes

1. **Always use the API functions** - Never call axios directly
2. **Use Jotai atoms** for shared state management
3. **Handle loading and error states** in your components
4. **Update atoms** after successful API calls
5. **Check authentication** before making protected requests

## 🔍 Path Aliases

Make sure your `tsconfig.json` or `jsconfig.json` includes:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

If using relative paths, adjust imports accordingly.

