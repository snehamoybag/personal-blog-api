type Data = Record<string, unknown> | null;

export default class ResponseShape {
  constructor(
    readonly status: "success" | "fail" | "error",
    readonly statusCode: number,
    readonly message: string,
    readonly data?: Data,
  ) {}
}

export class SuccessResponse extends ResponseShape {
  constructor(message: string, data?: Data) {
    const statusCode = 200;
    super("success", statusCode, message, data);
  }
}

export class ErrorResponse extends ResponseShape {
  constructor(statusCode: number, message: string, data?: Data) {
    super("error", statusCode, message, data);
  }
}

export class FailureResponse extends ResponseShape {
  constructor(statusCode: number, message: string, data?: Data) {
    super("fail", statusCode, message, data);
  }
}
