# Map Page Implementation

## Overview
Complete map page with filtering system, property list, and interactive map integration.

## Files Created/Modified

### Created Files:
1. **`app/Map/components/MapView.tsx`**
   - Enhanced map component with Mapbox integration
   - Supports property selection, marker clicks, and map centering
   - Exposes ref methods for external control

2. **`app/Map/components/MapFilterPanel.tsx`**
   - Collapsible filter panel (mobile-friendly)
   - Active filter chips with remove functionality
   - All filter fields: search, city, price range, area range, bedrooms, bathrooms, status, ordering

3. **`app/Map/components/PropertiesList.tsx`**
   - Scrollable property list with click handlers
   - Highlights selected property
   - Auto-scrolls to selected item

4. **`app/Map/page.tsx`**
   - Main page component with responsive layout
   - Desktop: Map (65%) + Panel (35%)
   - Tablet: Map (60%) + Panel (40%)
   - Mobile: Map on top, filters/list below

5. **`services/utils/useDebounce.ts`**
   - Debounce hook utility (for future use)

### Modified Files:
1. **`services/atoms/propertiesAtom.ts`**
   - Added `selectedPropertyIdAtom` for map/list synchronization

## Features

### Layout & Responsive Behavior
- ✅ Desktop (≥1024px): Two-column layout (Map 65%, Panel 35%)
- ✅ Tablet (640–1023px): Two-column layout (Map 60%, Panel 40%)
- ✅ Mobile (<640px): Vertical layout (Map top, Filters collapsible, List below)
- ✅ Sticky panel header on desktop/tablet
- ✅ Independent scrollable panel

### Filters Section
- ✅ Search input (text)
- ✅ City name (text input)
- ✅ Min/Max price (number inputs)
- ✅ Min/Max area (number inputs)
- ✅ Bedrooms (number input)
- ✅ Bathrooms (number input)
- ✅ Status dropdown (for_sale, for_rent, sold, rented)
- ✅ Ordering dropdown (price, area, date)
- ✅ Active filter chips with remove buttons
- ✅ Apply and Reset buttons
- ✅ Prevents duplicate API calls

### Properties List
- ✅ Displays image, title, location, price, area, bedrooms, bathrooms
- ✅ Click to center map and highlight property
- ✅ Auto-scrolls to selected item
- ✅ Loading skeletons
- ✅ Empty state message
- ✅ Pagination support (Load More button)

### Map Behavior
- ✅ Markers from filtered properties
- ✅ Click marker → opens popup + highlights list item
- ✅ Click list item → centers map + opens popup
- ✅ Smooth pan/zoom animations
- ✅ Fits bounds to show all markers
- ✅ Default center (Tehran) when no properties
- ✅ Selected marker highlighting

### State Management
- ✅ Uses Jotai atoms (`filtersAtom`, `filteredPropertiesAtom`, `selectedPropertyIdAtom`)
- ✅ Loading and error states
- ✅ Pagination support

### API Integration
- ✅ Uses existing `getFilteredProperties` API
- ✅ Error handling with toast notifications
- ✅ Prevents duplicate requests

## How to Use

1. **Navigate to `/Map` page**
2. **Use filters:**
   - Enter search terms, city, price/area ranges, etc.
   - Click "اعمال فیلتر" (Apply Filter)
   - Active filters appear as chips above the form
3. **Interact with map:**
   - Click markers to see property details
   - Click "مشاهده جزئیات" in popup to view full details
4. **Interact with list:**
   - Click any property card to center map on it
   - Selected property is highlighted
   - Click "مشاهده" button to view full details

## Environment Variables

Make sure `.env.local` contains:
```
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

## Testing Checklist

- [ ] Apply filters → results update → map updates
- [ ] Click marker → list item highlights
- [ ] Click list item → map centers on property
- [ ] Mobile: Filters collapse/expand correctly
- [ ] Active filter chips can be removed
- [ ] Pagination works (Load More button)
- [ ] Empty state shows when no results
- [ ] Error messages display correctly
- [ ] Loading skeletons appear during fetch

## Notes

- Mapbox token is required for map to display
- Properties without coordinates are shown in list only (not on map)
- Debouncing for search is implemented but not actively used (can be enabled if needed)
- All components use Vazir font (inherited from global styles)

