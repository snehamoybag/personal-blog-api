import { Router } from "express";
import * as blogsController from "../controllers/blogs.controller";
import { getMany as getManyComments } from "../controllers/comments.controller";

const blogs = Router();

// blogs/?limit=10&offset=0
blogs.get("/", blogsController.getMany);

// blogs/3
blogs.get("/:id", blogsController.getOne);

// blogs/2/commets/?limit=10&offset=10
blogs.get("/:blogId/comments", getManyComments);

export default blogs;
