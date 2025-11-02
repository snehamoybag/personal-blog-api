import { Request } from "express";
import { ErrorUnauthorized } from "../http-exceptions";
import { SafeUser } from "../../types/safe-user.type";

const assertUser = (req: Request): SafeUser => {
  if (!req.user) {
    throw new ErrorUnauthorized("Failed to authenticate user.");
  }

  const user = req.user as SafeUser;

  if (!user.id || !user.role) {
    throw new Error("User data mismatch.");
  }

  return user;
};

export default assertUser;
