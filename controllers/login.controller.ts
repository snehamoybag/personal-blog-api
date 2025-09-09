import { RequestHandler } from "express";
import { SuccessResponse } from "../libs/http-response-shapes";
import assertUser from "../libs/asserts/user.assert";
import assertAuthToken from "../libs/asserts/auth-token.assert";

export const sendSuccessData: RequestHandler = (req, res) => {
  const user = assertUser(req);
  const token = assertAuthToken(res);

  res.json(
    new SuccessResponse(
      "Login Successful. Use this token in the Authorization header as a Bearer token to authenticate future requests.",
      { user, token },
    ),
  );
};
