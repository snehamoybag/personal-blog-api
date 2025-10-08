import { RequestHandler } from "express";
import passport from "../../configs/passport.config";
import { AuthenticateCallback } from "passport";
import { ErrorUnauthorized } from "../../libs/http-exceptions";

const verifyAuthToken: RequestHandler = (req, res, next) => {
  const authenticateCallback: AuthenticateCallback = (err, user) => {
    if (err) {
      next(err);
      return;
    }

    if (!user) {
      next(new ErrorUnauthorized("Invalid auth token."));
      return;
    }

    req.user = user;

    next();
  };
  return passport.authenticate("jwt", { session: false }, authenticateCallback)(
    req,
    res,
    next,
  );
};

export default verifyAuthToken;
