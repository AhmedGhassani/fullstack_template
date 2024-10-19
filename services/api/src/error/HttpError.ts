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
  constructor(message: string = 'Bad request') {
    super(message, 400);
  }
}

export class InvalidBodyError extends HttpError {
  errors: string[] | undefined;

  constructor(message: string = 'Bad request', error?: ZodError) {
    super(message, 400);
    const errors = error?.issues.map((issue) => {
      const field = issue.path.join('.');
      const message = issue.message;
      return `${field}: ${message}`;
    });

    this.errors = errors;
  }
}

export class ConflictError extends HttpError {
  constructor(message: string = 'Conflict') {
    super(message, 409);
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
