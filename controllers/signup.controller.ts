import { RequestHandler } from "express";
import * as userValidations from "../validations/user.validation";
import { validationResult } from "express-validator";
import { FailureResponse, SuccessResponse } from "../libs/http-response-shapes";
import { create as createUser } from "../models/user.model";
import { UserRegistrationData } from "../types/user-registration-data.type";

export const signup: RequestHandler[] = [
  userValidations.name("First name", "firstName"),
  userValidations.name("Last name", "lastName"),
  userValidations.email(),
  userValidations.password(),

  // handle validation errors
  (req, res, next) => {
    const validationErros = validationResult(req);

    if (validationErros.isEmpty()) {
      return next();
    }

    const statusCode = 400;
    res.status(statusCode).json(
      new FailureResponse(statusCode, "Field validations failed.", {
        errors: validationErros.mapped(),
      }),
    );
  },

  // handle user creation
  async (req, res) => {
    const formData: UserRegistrationData = req.body;
    const user = await createUser(formData);

    res.json(new SuccessResponse("Signup complete.", { user }));
  },
];
