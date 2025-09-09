/// WRITE GLOBAL TYPES HERE
import "express";
import { SafeUser } from "./safe-user.type";

declare global {
  namespace Express {
    interface User extends SafeUser {}
  }
}
