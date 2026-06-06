import { AppError } from "./AppError";

export function requireText(
  value: unknown,
  message: string,
  statusCode: number = 400,
) {
  if (!String(value || "").trim()) {
    throw new AppError(statusCode, message);
  }
}

export function requireNumber(
  value: unknown,
  message: string,
  statusCode: number = 400,
) {
  if (Number.isNaN(value)) {
    throw new AppError(statusCode, message);
  }
}

export function requireFound<T>(
  value: T | null | undefined,
  message: string,
  statusCode: number = 404,
) {
  if (!value) {
    throw new AppError(statusCode, message);
  }

  return value;
}
