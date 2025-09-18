import { Blog } from "../generated/prisma";
import { SafeUser } from "./safe-user.type";

export type FormattedBlog = Blog & {
  tags: string[];
  author: SafeUser;
};
