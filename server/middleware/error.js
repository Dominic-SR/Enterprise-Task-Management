import ErrorResponse from '../utils/errorResponse.js';

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log for the developer
  console.error(`[Mongo Error] Name: ${err.name}, Code: ${err.code}`);

  // 1. Mongoose Bad ObjectId (CastError) - e.g., invalid ID format
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  // 2. Mongoose Duplicate Key (Code 11000) - e.g., email already exists
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate field value entered: ${field}`;
    error = new ErrorResponse(message, 400);
  }

  // 3. Mongoose Validation Error - e.g., required field missing
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  // Send the final response
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};