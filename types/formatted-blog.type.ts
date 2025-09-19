import { Blog } from "../generated/prisma";
import { SafeUser } from "./safe-user.type";

export type FormattedBlog = Blog & {
  imgUrls: string[];
  tags: string[];
  author: SafeUser;
};
