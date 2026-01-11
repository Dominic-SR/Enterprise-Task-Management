// utils/errorResponse.js
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    // This ensures the stack trace doesn't show this constructor call
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorResponse;