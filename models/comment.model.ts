import prisma from "../configs/prisma.config";
import { CreateComment } from "../types/create-comment.type";
import { FormattedComment } from "../types/formatted-comment.type";
import { UpdateComment } from "../types/update-comment.type";
import { safeUserSelects } from "./user.model";

export const findMany = (
  blogId: number,
  limit?: number,
  offset?: number,
): Promise<FormattedComment[]> => {
  const MIN_LIMIT = 0;
  const MIN_OFFSET = 0;

  return prisma.comment.findMany({
    where: { blogId },
    take: limit || MIN_LIMIT,
    skip: offset || MIN_OFFSET,
    include: {
      author: {
        ...safeUserSelects,
      },
    },
  });
};

export const findOne = (id: number): Promise<FormattedComment | null> => {
  return prisma.comment.findUnique({
    where: { id },
    include: {
      author: {
        ...safeUserSelects,
      },
    },
  });
};

export const create = (data: CreateComment): Promise<FormattedComment> => {
  const { message, authorId, blogId } = data;

  return prisma.comment.create({
    data: {
      message,

      author: {
        connect: { id: authorId },
      },

      blog: {
        connect: { id: blogId },
      },
    },

    include: {
      author: {
        ...safeUserSelects,
      },
    },
  });
};

export const update = (data: UpdateComment): Promise<FormattedComment> => {
  const { id, message } = data;

  return prisma.comment.update({
    where: { id },

    data: {
      message,
    },

    include: {
      author: {
        ...safeUserSelects,
      },
    },
  });
};

export const deleteOne = (id: number): Promise<FormattedComment> => {
  return prisma.comment.delete({
    where: { id },
    include: { author: { ...safeUserSelects } },
  });
};
