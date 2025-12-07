/**
 * Error Handling System
 * Centralized error logging and formatting
 * @deprecated Use errorHandler.ts instead
 */

import { XHRError } from "../api/xhr";
import { extractError } from "./errorHandler";

export interface ErrorLog {
  timestamp: string;
  endpoint: string;
  method: string;
  requestPayload?: any;
  statusCode: number;
  rawResponse: any;
  errorMessage: string;
  userAgent?: string;
  meta?: Record<string, any>;
}

/**
 * Log server error in JSON-friendly structure
 */
export function logServerError(
  error: XHRError | Error,
  meta?: Record<string, any>
): ErrorLog {
  const errorLog: ErrorLog = {
    timestamp: new Date().toISOString(),
    endpoint: meta?.endpoint || "unknown",
    method: meta?.method || "unknown",
    requestPayload: meta?.payload,
    statusCode: (error as XHRError).status || 0,
    rawResponse: (error as XHRError).raw || error.message,
    errorMessage:
      (error as XHRError).message || error.message || "Unknown error",
    userAgent:
      typeof window !== "undefined" ? window.navigator.userAgent : undefined,
    meta: meta,
  };

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.error("Error Log:", JSON.stringify(errorLog, null, 2));
  }

  // In production, you can send to logging service
  // Example: sendToLoggingService(errorLog);

  return errorLog;
}

/**
 * Normalize error to XHRError format
 * @deprecated Use extractError from errorHandler.ts instead
 */
export function normalizeError(error: any): XHRError {
  return extractError(error);
}

/**
 * Format error for user display
 */
export function formatErrorForUser(error: XHRError | Error): string {
  const normalized = normalizeError(error);

  // Return user-friendly message
  return normalized.message;
}

/**
 * Get error details for debugging
 */
export function getErrorDetails(error: XHRError | Error): {
  message: string;
  details?: any;
  status?: number;
} {
  const normalized = normalizeError(error);

  return {
    message: normalized.message,
    details: normalized.details,
    status: normalized.status,
  };
}

