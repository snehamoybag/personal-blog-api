import { Blog as PrismaBlog } from "@prisma/client";
import { SafeUser } from "./safe-user.type";

export type RawBlog = PrismaBlog & {
  tags: { name: string }[];
  author: SafeUser;
};
