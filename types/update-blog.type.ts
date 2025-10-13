import { BlogStatus } from "../generated/prisma";

export type UpdateBlog = {
  id: number;
  title?: string;
  content?: string;
  coverImgUrl?: string;
  status?: BlogStatus;
  selectedTags?: string[];
  removedTags?: string[];
};
