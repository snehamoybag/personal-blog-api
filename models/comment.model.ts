import prisma from "../configs/prisma.config";
import { FormattedComment } from "../types/formatted-comment.type";
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
