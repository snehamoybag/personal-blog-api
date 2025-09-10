import prisma from "../configs/prisma.config";
import { safeUserSelects } from "./user.model";
import { RawBlog } from "../types/raw-blog.type";
import { FormattedBlog } from "../types/formatted-blog.type";

const blogSelects = {
  include: {
    imgUrls: { select: { url: true } },

    tags: { select: { name: true } },

    author: {
      ...safeUserSelects,
    },
  },
};

const formatRawBlog = (blog: RawBlog) => {
  return {
    ...blog,
    imgUrls: blog.imgUrls.map((urlObj) => urlObj.url),
    tags: blog.tags.map((tagObj) => tagObj.name),
  };
};
export const findMany = async (
  limit?: number,
  offset?: number,
): Promise<FormattedBlog[]> => {
  const defaultLimit = 10;
  const defaultOffset = 0;

  const rawBlogs: RawBlog[] = await prisma.blog.findMany({
    take: limit || defaultLimit,
    skip: offset || defaultOffset,

    ...blogSelects,
  });

  const formttedBlogs = rawBlogs.map((blog) => {
    return formatRawBlog(blog);
  });

  return formttedBlogs;
};

export const findOne = async (id: number): Promise<FormattedBlog | null> => {
  const rawBlog: RawBlog | null = await prisma.blog.findUnique({
    where: { id },
    ...blogSelects,
  });

  if (!rawBlog) {
    return null;
  }

  return formatRawBlog(rawBlog);
};
