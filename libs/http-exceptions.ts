export default class HttpExeception extends Error {
  constructor(
    readonly message: string,
    readonly statusCode: number,
  ) {
    super(message);
  }
}

export class ErrorBadRequest extends HttpExeception {
  constructor(message: string) {
    super("ErrorBadRequest: " + message, 400);
  }
}

export class ErrorUnauthorized extends HttpExeception {
  constructor(message: string) {
    super("ErrorUnauthorized: " + message, 401);
  }
}

export class ErrorForbidden extends HttpExeception {
  constructor(message: string) {
    super("ErrorForbidden: " + message, 403);
  }
}

export class ErrorNotFound extends HttpExeception {
  constructor(message: string) {
    super("ErrorNotFound: " + message, 404);
  }
}
