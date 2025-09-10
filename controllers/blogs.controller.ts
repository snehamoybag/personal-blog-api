import { RequestHandler } from "express";
import * as blogValidations from "../validations/blog.validation";
import * as blogModel from "../models/blog.model";
import { FailureResponse, SuccessResponse } from "../libs/http-response-shapes";
import { validationResult } from "express-validator";
import { ErrorNotFound } from "../libs/http-exceptions";

export const getMany: RequestHandler[] = [
  blogValidations.limit(),
  blogValidations.offset(),

  // handle url query validation errors
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

  // handle valid url query
  async (req, res) => {
    const { limit, offset } = req.query;
    const blogs = await blogModel.findMany(Number(limit), Number(offset));

    res.json(new SuccessResponse(`List of ${blogs.length} blogs.`, { blogs }));
  },
];

export const getOne: RequestHandler[] = [
  blogValidations.id(),

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
    const blogId = Number(req.params.id);
    const blog = await blogModel.findOne(blogId);

    if (!blog) {
      throw new ErrorNotFound(`Blog with the id ${blogId} is not found.`);
    }

    res.json(new SuccessResponse(`Blog with the id ${blogId}.`, { blog }));
  },
];
