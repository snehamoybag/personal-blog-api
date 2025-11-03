import { RequestHandler } from "express";
import * as queryValidations from "../validations/url-query.validation";
import { validationResult } from "express-validator";
import { FailureResponse, SuccessResponse } from "../libs/http-response-shapes";
import * as tagModel from "../models/tag.model";
import { ErrorNotFound } from "../libs/http-exceptions";
import { findBlogsInTag } from "../models/blog.model";

export const getMany: RequestHandler[] = [
  queryValidations.limit(),
  queryValidations.offset(),
  queryValidations.order(),
  queryValidations.tagName(),

  // handle validation errors
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
    const [baseLimit, baseOffset] = [10, 0];

    const limit = Number(req.query.limit) || baseLimit;
    const offset = Number(req.query.offset) || baseOffset;
    const order = req.query.order
      ? (req.query.order as "asc" | "desc")
      : "desc";
    const name = String(req.query.name).trim() || undefined;

    const tags = await tagModel.findMany(limit, offset, order, name);

    res.json(new SuccessResponse(`List of ${tags.length} tags.`, { tags }));
  },
];

export const getBlogsInTag: RequestHandler[] = [
  queryValidations.limit(),
  queryValidations.offset(),
  queryValidations.order(),

  // handle validation errors
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
    const [baseLimit, baseOffset] = [10, 0];

    const limit = Number(req.query.limit) || baseLimit;
    const offset = Number(req.query.offset) || baseOffset;
    const order = req.query.order
      ? (req.query.order as "asc" | "desc")
      : "desc";

    const tagParam = req.params.tag.trim();
    const tag = await tagModel.findOne(tagParam);

    if (!tag) {
      throw new ErrorNotFound("Tag not found.");
    }

    const blogs = await findBlogsInTag(tagParam, limit, offset, order);

    res.json(
      new SuccessResponse(`List of blogs in the tag ${tagParam}.`, { blogs }),
    );
  },
];
