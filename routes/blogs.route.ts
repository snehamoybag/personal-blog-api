import { Router } from "express";
import * as blogsController from "../controllers/blogs.controller";

const blogs = Router();

// blogs/?limit=10&offset=0
blogs.get("/", blogsController.getMany);

// blogs/3
blogs.get("/:id", blogsController.getOne);

export default blogs;
