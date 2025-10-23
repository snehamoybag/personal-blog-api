import prisma from "../configs/prisma.config";

export const findMany = async (
  limit?: number,
  offset?: number,
  order?: "asc" | "desc",
  name?: string,
) => {
  const baseLimit = 10;
  const baseOffset = 0;

  const rawTags = await prisma.tag.findMany({
    where: {
      // gets ignored if name is not provided
      name: name
        ? {
            contains: name,
          }
        : undefined,
    },

    select: { name: true },

    take: limit || baseLimit,
    skip: offset || baseOffset,
    orderBy: { id: order || "desc" },
  });

  return rawTags.map((tag) => tag.name);
};
