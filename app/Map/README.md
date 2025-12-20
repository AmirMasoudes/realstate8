# Map Page - Production Ready Implementation

## Overview
Complete Map page with two-column layout: Map (left 65%) + Panel (right 35%) containing Filters (top) and Properties List (below). Full integration with backend filter API, bi-directional map/list interactions.

## Files Created/Modified

### Created Files:
1. **`services/utils/formatters.ts`** - Price, area, and number formatting utilities
2. **`services/utils/queryString.ts`** - Query string conversion utilities

### Modified Files:
1. **`app/Map/page.tsx`** - Main page component with responsive layout
2. **`app/Map/components/MapFilterPanel.tsx`** - Enhanced with debouncing, geolocation, property_type_name
3. **`app/properties/api/getFilteredProperties.ts`** - Added property_type_name to FilterParams

## Features

### Layout
- ✅ Desktop: Map (65%) + Panel (35%) with Filters on top, List below
- ✅ Tablet: Map (60%) + Panel (40%)
- ✅ Mobile: Vertical stack (Map top, Collapsible Filters, List bottom)
- ✅ Panel is independently scrollable; map stays visible
- ✅ Filters sticky on desktop/tablet

### Map
- ✅ Reuses existing Mapbox implementation
- ✅ Displays markers for filtered properties
- ✅ Fits bounds to show all markers
- ✅ Smooth pan/zoom to selected property
- ✅ Marker popups with image, price, area, bedrooms, "View" link
- ✅ Click marker → highlights list item & scrolls into view
- ✅ Click list item → pans map & opens popup

### Filters
- ✅ Search (debounced)
- ✅ City name (with geolocation button)
- ✅ Min/Max price
- ✅ Min/Max area
- ✅ Bedrooms
- ✅ Bathrooms
- ✅ Property type (property_type_name)
- ✅ Status (for_sale, for_rent, sold, rented)
- ✅ Ordering
- ✅ Active filter chips with remove
- ✅ Apply & Reset buttons
- ✅ Loading indicator

### Properties List
- ✅ Property cards with image, title, location, price, area, bedrooms, bathrooms
- ✅ Pagination support (Load More button)
- ✅ Selected property highlighting
- ✅ Empty state with reset action
- ✅ Loading skeletons

### State & API
- ✅ Uses existing Jotai atoms
- ✅ Uses existing xhr service
- ✅ Calls `GET /api/properties/filter/` with query params
- ✅ Error handling with toast notifications

## Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/
```

## Installation

No additional packages required. Uses existing:
- `mapbox-gl` (already in project)
- `jotai` (already in project)
- `react-hot-toast` (already in project)
- `axios` (already in project)

## Running & Testing

### 1. Start Backend
```bash
# Ensure backend is running on http://localhost:8000
```

### 2. Start Frontend
```bash
npm run dev
```

### 3. Navigate to Map Page
```
http://localhost:3000/Map
```

## QA Checklist

### Core Interactions
- [ ] Apply filters → Network request to `/api/properties/filter/` with correct params
- [ ] List updates with filtered results
- [ ] Map markers update to show filtered properties
- [ ] Click list item → Map centers on property & popup opens
- [ ] Click marker → Corresponding list item highlights & scrolls into view
- [ ] Active filter chips display correctly
- [ ] Remove filter chip → Filter updates & results refresh

### Mobile
- [ ] Filters collapse/expand correctly
- [ ] Map displays on top
- [ ] List scrolls independently

### Error Handling
- [ ] Network errors show toast notification
- [ ] Empty results show friendly message
- [ ] Loading states display correctly

### Performance
- [ ] Search input is debounced (500ms)
- [ ] No duplicate API calls
- [ ] Map bounds fit correctly
- [ ] Smooth animations on pan/zoom

## API Endpoint

```
GET http://localhost:8000/api/properties/filter/
Query Parameters:
- city_name
- min_price
- max_price
- min_area
- max_area
- bedrooms
- bathrooms
- property_type_name
- status
- search
- ordering
- page
- limit
```

## Notes

- Mapbox token is required (set in `.env.local`)
- Properties without coordinates are shown in list only
- All text uses Vazir font (inherited from global styles)
- Fully accessible with ARIA labels and keyboard navigation
