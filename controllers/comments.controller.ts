import { RequestHandler } from "express";
import * as queryValidations from "../validations/url-query.validation";
import * as commentValidations from "../validations/comment.validation";
import { validationResult } from "express-validator";
import { FailureResponse, SuccessResponse } from "../libs/http-response-shapes";
import * as commentModel from "../models/comment.model";
import { ErrorNotFound } from "../libs/http-exceptions";
import assertUser from "../libs/asserts/user.assert";

export const getMany: RequestHandler[] = [
  // validations
  queryValidations.limit(),
  queryValidations.offset(),
  queryValidations.order(),

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
    // descending by default
    const order = req.query.order
      ? (req.query.order as "asc" | "desc")
      : "desc";

    const comments = await commentModel.findMany(blogId, limit, offset, order);

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

export const create: RequestHandler[] = [
  commentValidations.blog(),
  commentValidations.message(),

  // handle validation error
  (req, res, next) => {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      return next();
    }

    const statusCode = 400;

    return res.status(statusCode).json(
      new FailureResponse(
        statusCode,
        "URL parameter or field validation failed.",
        {
          errors: validationErrors.mapped(),
        },
      ),
    );
  },

  // handle no validation errors
  async (req, res) => {
    const blogId = Number(req.params.blogId);
    const authorId = assertUser(req).id;

    const { message } = req.body;

    const comment = await commentModel.create({ message, authorId, blogId });

    res.json(new SuccessResponse("Comment created successfully.", { comment }));
  },
];

export const update: RequestHandler[] = [
  commentValidations.id(),
  commentValidations.message(),

  // handle validation error
  (req, res, next) => {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      return next();
    }

    const statusCode = 400;

    return res.status(statusCode).json(
      new FailureResponse(
        statusCode,
        "URL parameter or field validation failed.",
        {
          errors: validationErrors.mapped(),
        },
      ),
    );
  },

  // handle no validation errors
  async (req, res) => {
    const commentId = Number(req.params.id);

    const comment = await commentModel.findOne(commentId);

    if (!comment) {
      throw new ErrorNotFound(`Comment with the id ${commentId} is not found.`);
    }

    const { message } = req.body;

    const updatedComment = await commentModel.update({
      id: commentId,
      message,
    });

    res.json(
      new SuccessResponse("Comment updated successfully.", {
        comment: updatedComment,
      }),
    );
  },
];

export const deleteOne: RequestHandler[] = [
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

  // handle no validation error
  async (req, res) => {
    const commentId = Number(req.params.id);

    const comment = await commentModel.findOne(commentId);

    if (!comment) {
      throw new ErrorNotFound(`Comment with the id ${commentId} is not found.`);
    }

    const deletedComment = await commentModel.deleteOne(commentId);

    res.json(
      new SuccessResponse("Comment deleted successfully.", {
        comment: deletedComment,
      }),
    );
  },
];
