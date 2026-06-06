import axios, { type AxiosRequestConfig } from "axios"
import { env } from "./env"
import type { ApiEnvelop } from "./types"
import { useErrorStore } from "@/components/useErrorStore"

let tokenGetter: (() => Promise<string | null>) | null = null

export function setApiTokenGetter(
  getter: (() => Promise<string | null>) | null
) {
  tokenGetter = getter
}

const api = axios.create({
  baseURL: env.backendUrl,
  withCredentials: false,
})

api.interceptors.request.use(async (config) => {
  if (!tokenGetter) return config

  const token = await tokenGetter()

  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status

      if (status === 401) {
        console.error("Session expired. Please log in again.")
        // e.g., window.location.href = "/login"
      } else if (status === 403) {
        console.error("You don't have permission to perform this action.")
      } else if (status === 404) {
        console.error("Requested resource was not found.")
      }
    }
    return Promise.reject(error)
  }
)

function getErrorMsg(error: unknown) {
  let message = "something went wrong ! please try again."

  if (axios.isAxiosError(error)) {
    message =
      error.response?.data?.errors?.[0]?.message ||
      error.message ||
      "Request Failed"
  } else if (error instanceof Error) {
    message = error.message
  }

  useErrorStore.getState().showError(message)
  return message
}

export async function apiGet<T>(url: string, config?: AxiosRequestConfig) {
  try {
    const response = await api.get<ApiEnvelop<T>>(url, config)

    if (response.data.status === "error" || !response.data.data) {
      throw new Error(response?.data?.errors?.[0]?.message || "Request Failed")
    }

    return response.data.data
  } catch (error) {
    throw new Error(getErrorMsg(error))
  }
}

export async function apiGetPaginated<T>(
  url: string,
  config?: AxiosRequestConfig
) {
  try {
    const response = await api.get<ApiEnvelop<T>>(url, config)

    if (response.data.status === "error" || !response.data.data) {
      throw new Error(response?.data?.errors?.[0]?.message || "Request Failed")
    }

    return {
      data: response.data.data,
      totalCount: response.data.totalCount || 0,
    }
  } catch (error) {
    throw new Error(getErrorMsg(error))
  }
}

export async function apiPost<TResponse, Tbody = unknown>(
  url: string,
  body?: Tbody,
  config?: AxiosRequestConfig
) {
  try {
    const response = await api.post<ApiEnvelop<TResponse>>(url, body, config)

    if (response.data.status === "error" || !response.data.data) {
      throw new Error(response?.data?.errors?.[0]?.message || "Request Failed")
    }

    return response.data.data
  } catch (error) {
    throw new Error(getErrorMsg(error))
  }
}

export async function apiPut<TResponse, Tbody = unknown>(
  url: string,
  body?: Tbody,
  config?: AxiosRequestConfig
) {
  try {
    const response = await api.put<ApiEnvelop<TResponse>>(url, body, config)

    if (response.data.status === "error" || !response.data.data) {
      throw new Error(response?.data?.errors?.[0]?.message || "Request Failed")
    }

    return response.data.data
  } catch (error) {
    throw new Error(getErrorMsg(error))
  }
}

export async function apiPatch<TResponse, Tbody = unknown>(
  url: string,
  body?: Tbody,
  config?: AxiosRequestConfig
) {
  try {
    const response = await api.patch<ApiEnvelop<TResponse>>(url, body, config)

    if (response.data.status === "error" || !response.data.data) {
      throw new Error(response?.data?.errors?.[0]?.message || "Request Failed")
    }

    return response.data.data
  } catch (error) {
    throw new Error(getErrorMsg(error))
  }
}

export async function apiDelete<TResponse>(
  url: string,
  config?: AxiosRequestConfig
) {
  try {
    const response = await api.delete<ApiEnvelop<TResponse>>(url, config)
    if (response.data.status === "error" || !response.data.data) {
      throw new Error(response?.data?.errors?.[0]?.message || "Request Failed")
    }

    return response.data.data
  } catch (error) {
    throw new Error(getErrorMsg(error))
  }
}
