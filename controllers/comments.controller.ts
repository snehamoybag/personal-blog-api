import { RequestHandler } from "express";
import {
  limit as validateLimit,
  offset as validateOffset,
} from "../validations/limit-offset.validation";
import * as commentValidations from "../validations/comment.validation";
import { validationResult } from "express-validator";
import { FailureResponse, SuccessResponse } from "../libs/http-response-shapes";
import * as commentModel from "../models/comment.model";
import { ErrorNotFound } from "../libs/http-exceptions";

export const getMany: RequestHandler[] = [
  // validations
  validateLimit(),
  validateOffset(),
  commentValidations.blog(),

  // handle validation errors
  (req, res, next) => {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      return next();
    }

    const statusCode = 400;

    return res.status(statusCode).json(
      new FailureResponse(statusCode, "URL parameter validation failed.", {
        errors: validationErrors.mapped(),
      }),
    );
  },

  // send comment data
  async (req, res) => {
    const blogId = Number(req.params.blogId);
    const limit = Number(req.query.limit);
    const offset = Number(req.query.offset);

    const comments = await commentModel.findMany(blogId, limit, offset);

    res.json(
      new SuccessResponse(`List of ${comments.length} comments.`, { comments }),
    );
  },
];

export const getOne: RequestHandler[] = [
  commentValidations.id(),

  // handle validation error
  (req, res, next) => {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      return next();
    }

    const statusCode = 400;

    return res.status(statusCode).json(
      new FailureResponse(statusCode, "URL parameter validation failed.", {
        errors: validationErrors.mapped(),
      }),
    );
  },

  // handle valid param
  async (req, res) => {
    const commentId = Number(req.params.id);
    const comment = await commentModel.findOne(commentId);

    if (!comment) {
      throw new ErrorNotFound(`Comment with the id ${commentId} is not found.`);
    }

    res.json(
      new SuccessResponse(`Comment with the id ${commentId}.`, { comment }),
    );
  },
];
