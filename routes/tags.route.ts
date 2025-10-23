import { Router } from "express";
import * as tagsController from "../controllers/tags.controller";

const tags = Router();

// /tags/?name=tagName&limit=10&offset=0&order=asc
tags.get("/", tagsController.getMany);

export default tags;
