export type ApiEnvelop<DataType> = {
  status: "success" | "error";
  data: DataType | null;
  meta?: Record<string, unknown>;
  errors?: Array<{ message: string; code?: string }>;
  totalCount?:number;
};

export function ok<T>(data: T, meta?: Record<string, unknown>,totalCount?:number): ApiEnvelop<T> {
  return {
    status: "success",
    data,
    meta,
    totalCount
  };
}

export function fail(message: string, code?: string): ApiEnvelop<null> {
  return {
    status: "error",
    data: null,
    errors: [{ message, code }],
  };
}
