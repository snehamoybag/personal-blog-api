import { Router } from "express";
import * as signupController from "../controllers/signup.controller";
import issueAuthToken from "../middlewares/auth/issue-auth-token.middleware";

const signup = Router();

signup.post(
  "/",
  signupController.signup,
  issueAuthToken,
  signupController.sendSuccessData,
);

export default signup;
