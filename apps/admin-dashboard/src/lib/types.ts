export type UserRole = "user" | "admin"

export type AppUser = {
  id: string
  clerkUserId: string
  email?: string
  name?: string
  role: UserRole
}

export type ApiErrorItem = {
  message: string
  code?: string
}

export type ApiEnvelop<DataType> = {
  status: "success" | "error"
  data: DataType | null
  meta?: Record<string, unknown>
  errors?: Array<{ message: string; code?: string }>
  totalCount?: number
}
