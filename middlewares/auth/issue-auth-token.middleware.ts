import "dotenv/config";
import { RequestHandler } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import assertUser from "../../libs/asserts/user.assert";

const issueAuthToken: RequestHandler = (req, res, next) => {
  const user = assertUser(req);

  const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY;

  if (!JWT_PRIVATE_KEY) {
    throw new Error("Failed to retrive JWT private key.");
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const jwtOptions: SignOptions = {
    expiresIn: "7d",
  };

  jwt.sign(jwtPayload, JWT_PRIVATE_KEY, jwtOptions, (err, token) => {
    if (err) {
      return next(err);
    }

    if (!token) {
      return next(new Error("Failed to generate JWT."));
    }

    res.locals.token = token;
    next();
  });
};

export default issueAuthToken;
