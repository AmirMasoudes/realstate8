/**
 * Error Types and Interfaces
 */

import { XHRError } from "../api/xhr";

export interface ApiError extends XHRError {
  code?: string;
  field?: string;
  timestamp?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  message?: string;
  error?: string;
  detail?: string;
  errors?: string[] | ValidationError[];
  status?: number;
}

export type ErrorSource = "network" | "server" | "client" | "unknown";

export interface ParsedError {
  message: string;
  status: number;
  source: ErrorSource;
  details?: any;
  validationErrors?: ValidationError[];
}

