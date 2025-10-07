import prisma from "../configs/prisma.config";
import { Image } from "../generated/prisma";
import { CreateImage } from "../types/create-image.type";

export const findOneByUrl = (url: string) => {
  return prisma.image.findUnique({ where: { url } });
};

export const create = (data: CreateImage): Promise<Image> => {
  return prisma.image.create({ data });
};

export const deleteByUrl = (url: string): Promise<Image> => {
  return prisma.image.delete({ where: { url } });
};
