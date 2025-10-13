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
import { UpdateBlog } from "../types/update-blog.type";

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
  blogValidations.coverImgUrl(),
  blogValidations.tags(),
  blogValidations.status(),

  // handle validation error
  (req, res, next) => {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      return next();
    }

    const statusCode = 400;

    return res.status(statusCode).json(
      new FailureResponse(statusCode, "Field validation failed.", {
        errors: validationErrors.mapped(),
      }),
    );
  },

  // handle no validation errors
  async (req, res) => {
    const userId = assertUser(req).id;

    const { title, content, status, coverImgUrl, tags } = req.body;
    const blogData: CreateBlog = {
      title,
      content,
      status,
      coverImgUrl,
      tags,
      authorId: userId,
    };

    const blog = await blogModel.create(blogData);

    res.json(new SuccessResponse("New blog created successfully.", { blog }));
  },
];

export const update: RequestHandler[] = [
  blogValidations.id(),
  blogValidations.title(true),
  blogValidations.content(true),
  blogValidations.status(true),
  blogValidations.coverImgUrl(true),
  blogValidations.tags(true),

  // handle validation error
  (req, res, next) => {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      return next();
    }

    const statusCode = 400;

    return res.status(statusCode).json(
      new FailureResponse(statusCode, "Field validation failed.", {
        errors: validationErrors.mapped(),
      }),
    );
  },

  // no validation errors
  async (req, res) => {
    const blogId = Number(req.params.id);

    const blog = await blogModel.findOne(blogId);

    if (!blog) {
      throw new ErrorNotFound(`Blog with the id ${blogId} is not found.`);
    }

    const { title, content, status, coverImgUrl } = req.body;
    const selectedTags: string[] = req.body.tags;
    const removedTags = selectedTags.filter(
      (tagName: string) => !blog.tags.includes(tagName),
    );

    const updateData: UpdateBlog = {
      id: blogId,
      title,
      content,
      status,
      coverImgUrl,
      selectedTags,
      removedTags,
    };

    const updatedBlog = await blogModel.update(updateData);

    res.json(
      new SuccessResponse("Blog updated successfully.", { blog: updatedBlog }),
    );
  },
];

export const deleteOne: RequestHandler[] = [
  blogValidations.id(),

  // handle validationErrors error

  // handle validation error
  (req, res, next) => {
    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
      return next();
    }

    const statusCode = 400;

    return res.status(statusCode).json(
      new FailureResponse(statusCode, "Url parameter validation failed.", {
        errors: validationErrors.mapped(),
      }),
    );
  },

  // handle no validation errors
  async (req, res) => {
    const blogId = Number(req.params.id);

    const blog = await blogModel.findOne(blogId);

    if (!blog) {
      throw new ErrorNotFound(`Blog with the id ${blogId} is not found.`);
    }

    const deletedBlog = await blogModel.deleteOne(blogId);

    res.json(
      new SuccessResponse("Blog deleted successfully.", { blog: deletedBlog }),
    );
  },
];
