import { Image } from "../generated/prisma";
export type CreateImage = Omit<Image, "id" | "createdAt">;
