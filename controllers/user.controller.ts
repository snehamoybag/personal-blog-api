import { RequestHandler } from "express";
import * as userModel from "../models/user.model";
import { ErrorNotFound } from "../libs/http-exceptions";
import { SuccessResponse } from "../libs/http-response-shapes";
import { findUserWrittenBlogs } from "../models/blog.model";
import * as queryValidations from "../validations/url-query.validation";
import { validationResult } from "express-validator";
import { FailureResponse } from "../libs/http-response-shapes";

export const getOne: RequestHandler = async (req, res) => {
  const userId = Number(req.params.id) || 0;
  const user = await userModel.findById(userId);

  if (!user) {
    throw new ErrorNotFound("User not found.");
  }

  res.json(new SuccessResponse(`User with the id ${userId}`, { user }));
};

export const getWrittenBlogs: RequestHandler[] = [
  queryValidations.limit(),
  queryValidations.offset(),
  queryValidations.order(),

  // handle error
  (req, res, next) => {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      return next();
    }

    const statusCode = 400;

    return res.status(statusCode).json(
      new FailureResponse(statusCode, "URL query validation failed.", {
        errors: validationErrors.mapped(),
      }),
    );
  },

  // handle no error
  async (req, res) => {
    const authorId = Number(req.params.id) || 0;
    const author = await userModel.findById(authorId);

    if (!author) {
      throw new ErrorNotFound("User not found.");
    }

    const { limit, offset } = req.query;
    // descending by default
    const order = req.query.order
      ? (req.query.order as "asc" | "desc")
      : "desc";

    const blogs = await findUserWrittenBlogs(
      authorId,
      Number(limit),
      Number(offset),
      order,
    );

    res.json(
      new SuccessResponse("List of written blogs by the user.", { blogs }),
    );
  },
];
