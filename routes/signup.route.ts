import { Router } from "express";
import * as signupController from "../controllers/signup.controller";

const signup = Router();

signup.post("/", signupController.signup);

export default signup;
