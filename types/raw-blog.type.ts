import { Blog as PrismaBlog } from "../generated/prisma";
import { SafeUser } from "./safe-user.type";

export type RawBlog = PrismaBlog & {
  imgUrls: { url: string }[];
  tags: { name: string }[];
  author: SafeUser;
};
