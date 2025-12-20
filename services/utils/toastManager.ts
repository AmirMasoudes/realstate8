/**
 * Toast Manager with Deduplication
 * Prevents duplicate error messages from the same source
 */

import toast, { Toast } from "react-hot-toast";

interface ToastCache {
  [key: string]: {
    timestamp: number;
    count: number;
  };
}

const toastCache: ToastCache = {};
const CACHE_DURATION = 10000; // 10 seconds
const MAX_CACHE_SIZE = 50;

// Generate a unique key for error messages
function generateKey(message: string, source?: string): string {
  const sourceKey = source || "unknown";
  return `${sourceKey}:${message}`;
}

// Clean old cache entries
function cleanCache(): void {
  const now = Date.now();
  const keys = Object.keys(toastCache);
  
  if (keys.length > MAX_CACHE_SIZE) {
    // Remove oldest entries
    const sorted = keys
      .map((key) => ({ key, timestamp: toastCache[key].timestamp }))
      .sort((a, b) => a.timestamp - b.timestamp);
    
    const toRemove = sorted.slice(0, keys.length - MAX_CACHE_SIZE);
    toRemove.forEach(({ key }) => delete toastCache[key]);
  }

  // Remove expired entries
  keys.forEach((key) => {
    if (now - toastCache[key].timestamp > CACHE_DURATION) {
      delete toastCache[key];
    }
  });
}

/**
 * Show error toast with deduplication
 * @param message Error message
 * @param source Source identifier (e.g., "api", "map", "filter")
 * @param options Additional toast options
 */
export function showErrorToast(
  message: string,
  source?: string,
  options?: {
    duration?: number;
    id?: string;
  }
): string | null {
  cleanCache();
  
  const key = generateKey(message, source);
  const now = Date.now();
  const cached = toastCache[key];

  // If same error within cache duration, don't show again
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return null; // Don't show duplicate
  }

  // Update cache
  toastCache[key] = {
    timestamp: now,
    count: cached ? cached.count + 1 : 1,
  };

  // Show toast with beautiful styling
  return toast.error(message, {
    duration: options?.duration || 5000,
    id: options?.id || key,
    style: {
      background: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
      color: "#991b1b",
      border: "2px solid #fca5a5",
      borderRadius: "12px",
      padding: "16px 20px",
      boxShadow: "0 10px 25px rgba(239, 68, 68, 0.2)",
      fontFamily: '"Vazir", "Vazirmatn", "Tahoma", "Arial", sans-serif',
      direction: "rtl",
      textAlign: "right",
      fontSize: "14px",
      fontWeight: "600",
    },
    iconTheme: {
      primary: "#dc2626",
      secondary: "#fff",
    },
  });
}

/**
 * Show success toast with beautiful styling
 */
export function showSuccessToast(
  message: string,
  options?: {
    duration?: number;
    id?: string;
  }
): string {
  return toast.success(message, {
    duration: options?.duration || 3000,
    id: options?.id,
    style: {
      background: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
      color: "#065f46",
      border: "2px solid #6ee7b7",
      borderRadius: "12px",
      padding: "16px 20px",
      boxShadow: "0 10px 25px rgba(16, 185, 129, 0.2)",
      fontFamily: '"Vazir", "Vazirmatn", "Tahoma", "Arial", sans-serif',
      direction: "rtl",
      textAlign: "right",
      fontSize: "14px",
      fontWeight: "600",
    },
    iconTheme: {
      primary: "#10b981",
      secondary: "#fff",
    },
  });
}

/**
 * Clear toast cache (useful for testing or manual cleanup)
 */
export function clearToastCache(): void {
  Object.keys(toastCache).forEach((key) => delete toastCache[key]);
}

