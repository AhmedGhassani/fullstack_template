import { ZodError } from 'zod';

export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends HttpError {
  errors: ZodError | undefined;

  constructor(message: string = 'Bad request', errors?: ZodError) {
    super(message, 400);
    this.errors = errors;
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}
