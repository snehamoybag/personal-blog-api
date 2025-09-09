import { RequestHandler } from "express";
import passport from "../../configs/passport.config";
import { AuthenticateCallback } from "passport";
import { ErrorUnauthorized } from "../../libs/http-exceptions";

const authenticateUser: RequestHandler = (req, res, next) => {
  const authentcateCallback: AuthenticateCallback = (err, user, info) => {
    if (err) {
      return next(err);
    }

    // on successful login
    if (user) {
      req.user = user; // update the request with user
      return next();
    }

    // on un-successful login
    let errorMsg = "User authentication failed.";

    if (typeof info === "string") {
      errorMsg = info;
    } else if (Array.isArray(info) && typeof info[0] === "string") {
      errorMsg = info[0];
    } else if (typeof info === "object" && "message" in info) {
      errorMsg = String(info.message);
    }

    return next(new ErrorUnauthorized(errorMsg));
  };

  passport.authenticate("local", { session: false }, authentcateCallback)(
    req,
    res,
    next,
  );
};

export default authenticateUser;
