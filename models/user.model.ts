import prisma from "../configs/prisma.config";
import { SafeUser } from "../types/safe-user.type";
import bcrypt from "bcryptjs";
import { UserRegistrationData } from "../types/user-registration-data.type";

export const create = async ({
  firstName,
  lastName,
  email,
  password,
}: UserRegistrationData): Promise<SafeUser> => {
  const passwordHash = await bcrypt.hash(password, 10);

  return prisma.user.create({
    // creates
    data: {
      email,
      passwordHash,

      profile: {
        create: {
          firstName,
          lastName,
        },
      },
    },

    // selects
    omit: {
      email: true,
      passwordHash: true,
    },

    include: {
      profile: true,
    },
  });
};
