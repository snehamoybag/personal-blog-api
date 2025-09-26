import { Blog as PrismaBlog } from "../generated/prisma";
import { SafeUser } from "./safe-user.type";

export type RawBlog = PrismaBlog & {
  tags: { name: string }[];
  author: SafeUser;
};
