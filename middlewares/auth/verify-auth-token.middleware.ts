import { RequestHandler } from "express";
import passport from "../../configs/passport.config";

const verifyAuthToken: RequestHandler = (req, res, next) => {
  return passport.authenticate("jwt", { session: false })(req, res, next);
};

export default verifyAuthToken;
