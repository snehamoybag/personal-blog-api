import { Comment } from "../generated/prisma";
import { SafeUser } from "./safe-user.type";

export type FormattedComment = Comment & {
  author: SafeUser;
};
