// To standardize error handling by including additional information like status codes and making it easier to manage errors globally in middleware.

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
