import { Comment } from "@prisma/client";
import { SafeUser } from "./safe-user.type";

export type FormattedComment = Comment & {
  author: SafeUser;
};
