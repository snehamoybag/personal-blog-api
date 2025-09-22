import { RequestHandler } from "express";
import * as userValidations from "../validations/user.validation";
import { validationResult } from "express-validator";
import { FailureResponse, SuccessResponse } from "../libs/http-response-shapes";
import { create as createUser } from "../models/user.model";
import { UserRegistrationData } from "../types/user-registration-data.type";
import assertUser from "../libs/asserts/user.assert";
import assertAuthToken from "../libs/asserts/auth-token.assert";

export const signup: RequestHandler[] = [
  userValidations.name("First name", "firstName"),
  userValidations.name("Last name", "lastName"),
  userValidations.email(),
  userValidations.newEmail(),
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
  async (req, _res, next) => {
    const formData: UserRegistrationData = req.body;
    const user = await createUser(formData);

    req.user = user;
    next();
  },
];

export const sendSuccessData: RequestHandler = (req, res) => {
  const user = assertUser(req);
  const token = assertAuthToken(res);

  res.json(
    new SuccessResponse(
      "Signup Successful. Use this token in the Authorization header as a Bearer token to authenticate future requests.",
      { user, token },
    ),
  );
};
