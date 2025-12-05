/**
 * Centralized XHR Layer
 * All API requests must go through this module
 * Never use fetch directly elsewhere in the project
 */

export interface XHRError {
  status: number;
  message: string;
  details?: any;
  raw?: any;
}

export interface XHRConfig {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  timeout?: number;
}

class XHR {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private defaultTimeout: number = 30000;

  constructor() {
    // Set base URL from environment or default
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  /**
   * Get auth token from storage or context
   */
  private getAuthToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
    }
    return null;
  }

  /**
   * Build full URL with query parameters
   */
  private buildURL(endpoint: string, params?: Record<string, any>): string {
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${this.baseURL}${endpoint}`;

    if (!params) return url;

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `${url}?${queryString}` : url;
  }

  /**
   * Normalize error response
   */
  private normalizeError(
    status: number,
    response: any,
    url: string,
    method: string
  ): XHRError {
    let message = "خطایی رخ داد";
    let details = null;

    if (response) {
      if (typeof response === "string") {
        try {
          const parsed = JSON.parse(response);
          message = parsed.message || parsed.error || message;
          details = parsed.details || parsed.errors || null;
        } catch {
          message = response || message;
        }
      } else if (typeof response === "object") {
        message = response.message || response.error || message;
        details = response.details || response.errors || null;
      }
    }

    // Status-based messages
    if (!response || !response.message) {
      switch (status) {
        case 400:
          message = "درخواست نامعتبر است";
          break;
        case 401:
          message = "لطفاً وارد حساب کاربری خود شوید";
          break;
        case 403:
          message = "شما دسترسی به این بخش ندارید";
          break;
        case 404:
          message = "منبع مورد نظر یافت نشد";
          break;
        case 422:
          message = "اطلاعات ارسالی نامعتبر است";
          break;
        case 500:
          message = "خطای سرور رخ داد";
          break;
        case 503:
          message = "سرویس در دسترس نیست";
          break;
        default:
          message = `خطا: ${status}`;
      }
    }

    return {
      status,
      message,
      details,
      raw: response,
    };
  }

  /**
   * Make HTTP request
   */
  private async request<T>(
    method: string,
    endpoint: string,
    data?: any,
    config?: XHRConfig
  ): Promise<T> {
    const url = this.buildURL(endpoint, config?.params);
    const headers: Record<string, string> = {
      ...this.defaultHeaders,
      ...config?.headers,
    };

    // Add auth token if available
    const token = this.getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const requestConfig: RequestInit = {
      method,
      headers,
      signal: AbortSignal.timeout(config?.timeout || this.defaultTimeout),
    };

    if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
      requestConfig.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, requestConfig);
      const contentType = response.headers.get("content-type");

      let responseData: any;
      if (contentType?.includes("application/json")) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }

      if (!response.ok) {
        const error = this.normalizeError(
          response.status,
          responseData,
          url,
          method
        );
        throw error;
      }

      return responseData as T;
    } catch (error: any) {
      if (error.name === "AbortError") {
        throw {
          status: 408,
          message: "درخواست به دلیل زمان‌بر بودن لغو شد",
          details: null,
          raw: error,
        } as XHRError;
      }

      if (error.status) {
        // Already normalized error
        throw error;
      }

      // Network or other errors
      throw {
        status: 0,
        message: "خطا در اتصال به سرور",
        details: error.message,
        raw: error,
      } as XHRError;
    }
  }

  /**
   * GET request
   */
  async get<T = any>(
    endpoint: string,
    params?: Record<string, any>,
    config?: Omit<XHRConfig, "params">
  ): Promise<T> {
    return this.request<T>("GET", endpoint, undefined, { ...config, params });
  }

  /**
   * POST request
   */
  async post<T = any>(
    endpoint: string,
    data?: any,
    config?: XHRConfig
  ): Promise<T> {
    return this.request<T>("POST", endpoint, data, config);
  }

  /**
   * PUT request
   */
  async put<T = any>(
    endpoint: string,
    data?: any,
    config?: XHRConfig
  ): Promise<T> {
    return this.request<T>("PUT", endpoint, data, config);
  }

  /**
   * PATCH request
   */
  async patch<T = any>(
    endpoint: string,
    data?: any,
    config?: XHRConfig
  ): Promise<T> {
    return this.request<T>("PATCH", endpoint, data, config);
  }

  /**
   * DELETE request
   */
  async delete<T = any>(
    endpoint: string,
    params?: Record<string, any>,
    config?: Omit<XHRConfig, "params">
  ): Promise<T> {
    return this.request<T>("DELETE", endpoint, undefined, {
      ...config,
      params,
    });
  }
}

// Export singleton instance
const xhr = new XHR();
export default xhr;
