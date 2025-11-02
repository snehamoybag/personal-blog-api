import { Blog } from "@prisma/client";

export type CreateBlog = Omit<Blog, "id" | "createdAt" | "updatedAt"> & {
  tags: string[];
};
