import { Blog } from "../generated/prisma";

export type CreateBlog = Omit<Blog, "id" | "createdAt" | "updatedAt">;
