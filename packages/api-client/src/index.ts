import axios, { AxiosInstance, AxiosRequestConfig, isAxiosError } from "axios";

export * from "./services/customerProductService";

export interface ApiEnvelope<T> {
  status: "success" | "error";
  data?: T;
  errors?: Array<{ message: string }>;
  totalCount?: number;
}

export interface ApiClientConfig {
  backendUrl: string;
  onSessionExpired?: () => void;
  onGlobalError?: (message: string) => void;
  tokenGetter?: () => Promise<string | null>;
}

// 🚀 3. Centralized Enterprise Network Client Core
export class ApiClient {
  private api: AxiosInstance;

  constructor(config: ApiClientConfig) {
    this.api = axios.create({
      baseURL: config.backendUrl,
      withCredentials: false,
    });

    // 🔒 Request Interceptor: Dynamic security JWT token injection
    this.api.interceptors.request.use(async (axiosConfig) => {
      if (config.tokenGetter) {
        const token = await config.tokenGetter();
        if (token) {
          axiosConfig.headers = axiosConfig.headers || {};
          axiosConfig.headers.Authorization = `Bearer ${token}`;
        }
      }
      return axiosConfig;
    });

    // ⚠️ Response Interceptor: HTTP status code catching and isolation gates
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (isAxiosError(error) && error.response) {
          const status = error.response.status;
          if (status === 401 && config.onSessionExpired) {
            config.onSessionExpired();
          }
        }
        return Promise.reject(error);
      },
    );

    // Bind utility functions to maintain seamless lexical scoper references
    this.handleError = this.handleError.bind(this);
    this.get = this.get.bind(this);
    this.getPaginated = this.getPaginated.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.patch = this.patch.bind(this);
    this.delete = this.delete.bind(this);
  }

  // 📥 4. Unified Error Processor (Safely signals UI stores via Dependency Injection triggers)
  private handleError(error: unknown, fallbackMessage: string): string {
    let message = "something went wrong ! please try again.";

    if (isAxiosError(error)) {
      message =
        error.response?.data?.errors?.[0]?.message ||
        error.message ||
        "Request Failed";
    } else if (error instanceof Error) {
      message = error.message;
    }

    return message;
  }

  // 📦 5. Optimized Semantic CRUD Operations matching your exact Monolithic structure
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.api.get<ApiEnvelope<T>>(url, config);
      if (response.data.status === "error" || !response.data.data) {
        throw new Error(response.data.errors?.[0]?.message || "Request Failed");
      }
      return response.data.data;
    } catch (error) {
      throw new Error(this.handleError(error, "Request Failed"));
    }
  }

  public async getPaginated<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<{ data: T; totalCount: number }> {
    try {
      const response = await this.api.get<ApiEnvelope<T>>(url, config);
      if (response.data.status === "error" || !response.data.data) {
        throw new Error(response.data.errors?.[0]?.message || "Request Failed");
      }
      return {
        data: response.data.data,
        totalCount: response.data.totalCount || 0,
      };
    } catch (error) {
      throw new Error(this.handleError(error, "Pagination Request Failed"));
    }
  }

  public async post<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    try {
      const response = await this.api.post<ApiEnvelope<TResponse>>(
        url,
        body,
        config,
      );
      if (response.data.status === "error" || !response.data.data) {
        throw new Error(response.data.errors?.[0]?.message || "Request Failed");
      }
      return response.data.data;
    } catch (error) {
      throw new Error(this.handleError(error, "Mutation Post Failed"));
    }
  }

  public async put<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    try {
      const response = await this.api.put<ApiEnvelope<TResponse>>(
        url,
        body,
        config,
      );
      if (response.data.status === "error" || !response.data.data) {
        throw new Error(response.data.errors?.[0]?.message || "Request Failed");
      }
      return response.data.data;
    } catch (error) {
      throw new Error(this.handleError(error, "Mutation Put Failed"));
    }
  }

  public async patch<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    try {
      const response = await this.api.patch<ApiEnvelope<TResponse>>(
        url,
        body,
        config,
      );
      if (response.data.status === "error" || !response.data.data) {
        throw new Error(response.data.errors?.[0]?.message || "Request Failed");
      }
      return response.data.data;
    } catch (error) {
      throw new Error(this.handleError(error, "Mutation Patch Failed"));
    }
  }

  public async delete<TResponse>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<TResponse> {
    try {
      const response = await this.api.delete<ApiEnvelope<TResponse>>(
        url,
        config,
      );
      if (response.data.status === "error" || !response.data.data) {
        throw new Error(response.data.errors?.[0]?.message || "Request Failed");
      }
      return response.data.data;
    } catch (error) {
      throw new Error(this.handleError(error, "Deletion Request Failed"));
    }
  }
}
