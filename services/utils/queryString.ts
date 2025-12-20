/**
 * Query String Utilities
 * Convert filter objects to query parameters
 */

/**
 * Convert filter object to query string
 * Handles arrays, booleans, dates, and nested objects
 */
export function objectToQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];

    if (value === undefined || value === null || value === "") {
      return; // Skip empty values
    }

    if (Array.isArray(value)) {
      // Handle arrays
      value.forEach((item) => {
        if (item !== undefined && item !== null && item !== "") {
          searchParams.append(key, String(item));
        }
      });
    } else if (typeof value === "object" && value instanceof Date) {
      // Handle dates
      searchParams.append(key, value.toISOString());
    } else if (typeof value === "boolean") {
      // Handle booleans
      searchParams.append(key, value ? "true" : "false");
    } else {
      // Handle primitives
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
}

/**
 * Clean filter object - remove undefined, null, empty strings
 */
export function cleanFilterObject<T extends Record<string, any>>(filters: T): Partial<T> {
  const cleaned: Partial<T> = {};

  Object.keys(filters).forEach((key) => {
    const value = filters[key];
    if (value !== undefined && value !== null && value !== "") {
      cleaned[key as keyof T] = value;
    }
  });

  return cleaned;
}

