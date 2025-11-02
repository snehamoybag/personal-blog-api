import { Blog } from "@prisma/client";
import { SafeUser } from "./safe-user.type";

export type FormattedBlog = Blog & {
  tags: string[];
  author: SafeUser;
};
