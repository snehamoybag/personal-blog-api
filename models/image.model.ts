import prisma from "../configs/prisma.config";

export const findOneByUrl = (url: string) => {
  return prisma.image.findUnique({ where: { url } });
};
