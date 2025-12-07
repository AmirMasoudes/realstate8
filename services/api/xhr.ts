/**
 * Centralized XHR Layer with Axios
 * All API requests must go through this module
 * Base URL: http://localhost:8000/api/
 */

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import toast from "react-hot-toast";

export interface XHRError {
  status: number;
  message: string;
  details?: any;
  raw?: any;
}

export interface XHRConfig extends AxiosRequestConfig {
  params?: Record<string, any>;
  showErrorToast?: boolean; // Control whether to show toast on error
}

class XHR {
  private instance: AxiosInstance;
  private baseURL: string = "http://localhost:8000/api/";
  private defaultTimeout: number = 30000;

  constructor() {
    // Set base URL from environment or use default
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/";

    // Create axios instance
    this.instance = axios.create({
      baseURL: this.baseURL,
      timeout: this.defaultTimeout,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Setup interceptors
    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error: AxiosError) => {
        // Request error
        const errorMessage = this.extractErrorMessage(error);
        if (error.config?.showErrorToast !== false) {
          toast.error(errorMessage);
        }
        return Promise.reject(this.normalizeError(error));
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Return response data directly
        return response;
      },
      (error: AxiosError) => {
        // Response error
        const normalizedError = this.normalizeError(error);
        const errorMessage = normalizedError.message;

        // Show toast unless explicitly disabled
        if (error.config?.showErrorToast !== false) {
          toast.error(errorMessage);
        }

        // Handle 401 - Unauthorized
        if (normalizedError.status === 401) {
          this.handleUnauthorized();
        }

        return Promise.reject(normalizedError);
      }
    );
  }

  /**
   * Get auth token from localStorage
   */
  private getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
    }
    return null;
  }

  /**
   * Handle 401 Unauthorized
   */
  private handleUnauthorized(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      // Optionally redirect to login
      // window.location.href = "/login";
    }
  }

  /**
   * Extract error message from Axios error
   */
  private extractErrorMessage(error: AxiosError): string {
    // Try to get message from response
    if (error.response?.data) {
      const data = error.response.data as any;
      
      // Check for common error message fields
      if (data.message) return data.message;
      if (data.error) return data.error;
      if (data.detail) return data.detail;
      if (data.errors && Array.isArray(data.errors)) {
        return data.errors.join(", ");
      }
      if (typeof data === "string") return data;
    }

    // Fallback to status-based messages
    if (error.response?.status) {
      return this.getStatusMessage(error.response.status);
    }

    // Network error
    if (error.code === "ECONNABORTED") {
      return "درخواست به دلیل زمان‌بر بودن لغو شد";
    }

    if (error.message === "Network Error" || !error.response) {
      return "خطا در اتصال به سرور. لطفاً اتصال اینترنت خود را بررسی کنید.";
    }

    return "خطایی رخ داد";
  }

  /**
   * Get status-based error message
   */
  private getStatusMessage(status: number): string {
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
   * Normalize error to XHRError format
   */
  private normalizeError(error: AxiosError): XHRError {
    const message = this.extractErrorMessage(error);
    const status = error.response?.status || 0;

    return {
      status,
      message,
      details: error.response?.data,
      raw: error,
    };
  }

  /**
   * GET request
   */
  async get<T = any>(
    endpoint: string,
    params?: Record<string, any>,
    config?: XHRConfig
  ): Promise<T> {
    const response = await this.instance.get<T>(endpoint, {
      ...config,
      params,
    });
    return response.data;
  }

  /**
   * POST request
   */
  async post<T = any>(
    endpoint: string,
    data?: any,
    config?: XHRConfig
  ): Promise<T> {
    const response = await this.instance.post<T>(endpoint, data, config);
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T = any>(
    endpoint: string,
    data?: any,
    config?: XHRConfig
  ): Promise<T> {
    const response = await this.instance.put<T>(endpoint, data, config);
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch<T = any>(
    endpoint: string,
    data?: any,
    config?: XHRConfig
  ): Promise<T> {
    const response = await this.instance.patch<T>(endpoint, data, config);
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T = any>(
    endpoint: string,
    params?: Record<string, any>,
    config?: XHRConfig
  ): Promise<T> {
    const response = await this.instance.delete<T>(endpoint, {
      ...config,
      params,
    });
    return response.data;
  }
}

// Export singleton instance
const xhr = new XHR();
export default xhr;
