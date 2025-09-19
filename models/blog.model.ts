import prisma from "../configs/prisma.config";
import { safeUserSelects } from "./user.model";
import { RawBlog } from "../types/raw-blog.type";
import { FormattedBlog } from "../types/formatted-blog.type";
import { CreateBlog } from "../types/create-blog.type";
import { UpdateBlog } from "../types/update-blog.type";

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

export const create = async (
  data: CreateBlog,
): Promise<FormattedBlog | null> => {
  const { title, content, status, tags, authorId } = data;

  const rawBlog: RawBlog = await prisma.blog.create({
    data: {
      title,
      content,
      status,

      author: {
        connect: { id: authorId },
      },

      // TODO: images

      tags: {
        connectOrCreate: tags.map((tagName) => ({
          where: { name: tagName },
          create: { name: tagName },
        })),
      },
    },

    ...blogSelects,
  });

  return formatRawBlog(rawBlog);
};

export const update = async (data: UpdateBlog): Promise<FormattedBlog> => {
  const { id, title, content, status, tags } = data;

  const rawBlog: RawBlog = await prisma.blog.update({
    where: { id },

    data: {
      title,
      content,
      status,
    },

    // TODO: tags
    // disconnect from removed tags
    // create or connect to new tags

    // TODO: images

    ...blogSelects,
  });

  return formatRawBlog(rawBlog);
};

export const deleteOne = async (id: number): Promise<FormattedBlog> => {
  const deleteBlogImagesQuery = prisma.blogImage.deleteMany({
    where: { blogId: id },
  });

  const deletedBlogQuery = prisma.blog.delete({
    where: { id },
    ...blogSelects,
  });

  const result = await prisma.$transaction([
    deleteBlogImagesQuery,
    deletedBlogQuery,
  ]);

  const deletedBlogRaw = result[1];

  return formatRawBlog(deletedBlogRaw);
};
