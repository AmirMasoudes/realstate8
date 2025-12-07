/**
 * Error Handler - Extract and format errors
 */

import { AxiosError } from "axios";
import { XHRError } from "../api/xhr";
import { ApiError, ErrorResponse, ParsedError, ValidationError, ErrorSource } from "./errorTypes";

/**
 * Extract error message from various error types
 */
export function extractError(error: unknown): XHRError {
  // If already XHRError, return as is
  if (error && typeof error === "object" && "status" in error && "message" in error) {
    return error as XHRError;
  }

  // Handle Axios errors
  if (error instanceof Error && "isAxiosError" in error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    return extractAxiosError(axiosError);
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return {
      status: 0,
      message: mapErrorMessage(error.message),
      details: null,
      raw: error,
    };
  }

  // Handle string errors
  if (typeof error === "string") {
    return {
      status: 0,
      message: mapErrorMessage(error),
      details: null,
      raw: error,
    };
  }

  // Unknown error
  return {
    status: 0,
    message: "خطای نامشخص رخ داد",
    details: error,
    raw: error,
  };
}

/**
 * Extract error from Axios error
 */
function extractAxiosError(error: AxiosError<ErrorResponse>): XHRError {
  const status = error.response?.status || 0;
  const responseData = error.response?.data;

  let message = "خطایی رخ داد";
  let details: any = null;

  if (responseData) {
    // Try different message fields
    if (responseData.message) {
      message = mapErrorMessage(responseData.message);
    } else if (responseData.error) {
      message = mapErrorMessage(responseData.error);
    } else if (responseData.detail) {
      message = mapErrorMessage(responseData.detail);
    } else if (Array.isArray(responseData.errors)) {
      // Handle validation errors
      const errorMessages = responseData.errors.map((err) => {
        if (typeof err === "string") return err;
        return err.message || "خطای اعتبارسنجی";
      });
      message = errorMessages.join(", ");
    }

    details = responseData;
  }

  // Fallback to status-based message
  if (message === "خطایی رخ داد" && status > 0) {
    message = getStatusMessage(status);
  }

  // Network errors
  if (error.code === "ECONNABORTED") {
    message = "درخواست به دلیل زمان‌بر بودن لغو شد";
  } else if (error.message === "Network Error" || !error.response) {
    message = "خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.";
  }

  return {
    status,
    message,
    details,
    raw: error,
  };
}

/**
 * Map backend error messages to Persian
 */
function mapErrorMessage(message: string): string {
  const messageMap: Record<string, string> = {
    // Common English messages
    "Not found": "یافت نشد",
    "Unauthorized": "لطفاً وارد حساب کاربری خود شوید",
    "Forbidden": "شما دسترسی به این بخش ندارید",
    "Bad Request": "درخواست نامعتبر است",
    "Internal Server Error": "خطای سرور رخ داد",
    "Service Unavailable": "سرویس در دسترس نیست",
    "Request timeout": "زمان درخواست به پایان رسید",
    "Network Error": "خطا در اتصال به سرور",

    // Validation messages
    "Invalid input": "ورودی نامعتبر است",
    "Required field": "این فیلد الزامی است",
    "Invalid email": "ایمیل نامعتبر است",
    "Invalid phone": "شماره تلفن نامعتبر است",
    "Password too short": "رمز عبور کوتاه است",
    "Passwords do not match": "رمزهای عبور مطابقت ندارند",

    // Auth messages
    "Invalid credentials": "نام کاربری یا رمز عبور اشتباه است",
    "Token expired": "جلسه شما منقضی شده است",
    "User not found": "کاربر یافت نشد",
    "Email already exists": "این ایمیل قبلاً ثبت شده است",

    // Property messages
    "Property not found": "ملک یافت نشد",
    "Property already exists": "این ملک قبلاً ثبت شده است",
  };

  // Check if message exists in map
  const lowerMessage = message.toLowerCase();
  for (const [key, value] of Object.entries(messageMap)) {
    if (lowerMessage.includes(key.toLowerCase())) {
      return value;
    }
  }

  // Return original message if it's already in Persian or not in map
  return message;
}

/**
 * Get status-based error message
 */
function getStatusMessage(status: number): string {
  const messages: Record<number, string> = {
    400: "درخواست نامعتبر است",
    401: "لطفاً وارد حساب کاربری خود شوید",
    403: "شما دسترسی به این بخش ندارید",
    404: "منبع مورد نظر یافت نشد",
    422: "اطلاعات ارسالی نامعتبر است",
    500: "خطای سرور رخ داد. لطفاً بعداً تلاش کنید",
    502: "خطا در ارتباط با سرور",
    503: "سرویس در دسترس نیست",
    504: "زمان اتصال به سرور به پایان رسید",
  };

  return messages[status] || `خطا: ${status}`;
}

/**
 * Parse error for detailed information
 */
export function parseError(error: unknown): ParsedError {
  const extracted = extractError(error);
  
  let source: ErrorSource = "unknown";
  if (extracted.status === 0) {
    source = "network";
  } else if (extracted.status >= 500) {
    source = "server";
  } else if (extracted.status >= 400) {
    source = "client";
  }

  const validationErrors: ValidationError[] = [];
  if (extracted.details?.errors && Array.isArray(extracted.details.errors)) {
    extracted.details.errors.forEach((err: any) => {
      if (typeof err === "object" && err.field && err.message) {
        validationErrors.push({
          field: err.field,
          message: err.message,
        });
      }
    });
  }

  return {
    message: extracted.message,
    status: extracted.status,
    source,
    details: extracted.details,
    validationErrors: validationErrors.length > 0 ? validationErrors : undefined,
  };
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  const extracted = extractError(error);
  return extracted.status === 0;
}

/**
 * Check if error is a server error
 */
export function isServerError(error: unknown): boolean {
  const extracted = extractError(error);
  return extracted.status >= 500;
}

/**
 * Check if error is a client error
 */
export function isClientError(error: unknown): boolean {
  const extracted = extractError(error);
  return extracted.status >= 400 && extracted.status < 500;
}

