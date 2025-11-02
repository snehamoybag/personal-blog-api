import { RequestHandler } from "express";
import assertUser from "../../libs/asserts/user.assert";
import { ErrorForbidden } from "../../libs/http-exceptions";

const adminOnly: RequestHandler = (req, _res, next) => {
  const user = assertUser(req);

  if (user.role !== "ADMIN") {
    throw new ErrorForbidden("Only an admin can access this resource.");
  }

  next();
};

export default adminOnly;
