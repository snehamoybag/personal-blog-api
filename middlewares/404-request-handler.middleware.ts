import { RequestHandler } from "express";
import { FailureResponse } from "../libs/http-response-shapes";

const requeset404Handler: RequestHandler = (_req, res) => {
  const statusCode = 404;

  res
    .status(statusCode)
    .json(
      new FailureResponse(
        statusCode,
        "The resource you're looking for doesn't exist or may have been deleted permanently.",
      ),
    );
};

export default requeset404Handler;
