import { Image } from "@prisma/client";
export type CreateImage = Omit<Image, "id" | "createdAt">;
