import { RequestHandler } from "express";
import * as blogValidations from "../validations/blog.validation";
import * as blogModel from "../models/blog.model";
import { FailureResponse, SuccessResponse } from "../libs/http-response-shapes";
import { validationResult } from "express-validator";
import { ErrorNotFound } from "../libs/http-exceptions";
import {
  limit as limitValidation,
  offset as offsetValidation,
} from "../validations/limit-offset.validation";
import assertUser from "../libs/asserts/user.assert";
import { CreateBlog } from "../types/create-blog.type";

export const getMany: RequestHandler[] = [
  limitValidation(),
  offsetValidation(),

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

export const create: RequestHandler[] = [
  blogValidations.title(),
  blogValidations.content(),
  blogValidations.status(),

  // handle validation errors
  (req, res, next) => {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      return next();
    }

    const statusCode = 400;

    res.status(statusCode).json(
      new FailureResponse(statusCode, "Field validation failed.", {
        errors: validationErrors.mapped(),
      }),
    );
  },

  // handle no error
  async (req, res) => {
    const userId = assertUser(req).id;

    // TODO: implement cover image and content images
    const coverImgUrl = "randomstring";
    const data: CreateBlog = {
      ...req.body,
      coverImgUrl: coverImgUrl,
      imgUrls: [],
      authorId: userId,
    };

    const blog = await blogModel.createOne(data);

    res.json(new SuccessResponse("Blog created successfully.", { blog }));
  },
];
