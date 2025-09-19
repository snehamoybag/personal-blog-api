import { BlogStatus } from "../generated/prisma";

export type UpdateBlog = {
  id: number;
  title?: string;
  content?: string;
  status?: BlogStatus;
  tags?: string[];
};
