import { Router } from "express";
import { SuccessResponse } from "../libs/http-response-shapes";

const index = Router();

index.get("/", (_req, res) => {
  res.json(
    new SuccessResponse("Hi from Snehamoy's blog.", {
      name: "Snehamoy's Blog",
      version: "1.0.0",
    }),
  );
});

export default index;
