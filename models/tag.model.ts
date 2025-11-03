import prisma from "../configs/prisma.config";

export const findOne = async (name: string): Promise<string | null> => {
  const tag = await prisma.tag.findUnique({ where: { name } });

  if (!tag) {
    return null;
  }

  return tag.name;
};

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
