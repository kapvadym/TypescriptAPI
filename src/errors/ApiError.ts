export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static BadRequest(msg: string) {
    return new ApiError(400, msg);
  }

  static NotFound(msg: string) {
    return new ApiError(404, msg);
  }

  static Unauthorized(msg: string) {
    return new ApiError(401, msg);
  }
}