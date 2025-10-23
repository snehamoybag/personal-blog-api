import { Router } from "express";
import { SuccessResponse } from "../libs/http-response-shapes";
import verifyAuthToken from "../middlewares/auth/verify-auth-token.middleware";

const index = Router();

index.get("/", (_req, res) => {
  res.json(
    new SuccessResponse("Hi from Snehamoy's blog.", {
      name: "Snehamoy's Blog",
      version: "1.0.0",
    }),
  );
});

// use this route to verify if the issued JWT is still valid
index.post("/", verifyAuthToken, (_req, res) => {
  res.json(
    new SuccessResponse("Hi from Snehamoy's blog.", {
      name: "Snehamoy's Blog",
      version: "1.0.0",
    }),
  );
});

export default index;
