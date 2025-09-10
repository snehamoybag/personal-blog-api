import prisma from "../configs/prisma.config";
import { SafeUser } from "../types/safe-user.type";
import bcrypt from "bcryptjs";
import { UserRegistrationData } from "../types/user-registration-data.type";

export const safeUserSelects = {
  omit: {
    email: true,
    passwordHash: true,
  },

  include: {
    profile: true,
  },
};

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
    ...safeUserSelects,
  });
};

export const findById = (id: number): Promise<SafeUser | null> => {
  return prisma.user.findUnique({ where: { id }, ...safeUserSelects });
};

export const findByEmail = (email: string): Promise<SafeUser | null> => {
  return prisma.user.findUnique({
    where: { email },
    ...safeUserSelects,
  });
};

export const getIsPasswordMatching = async (
  userId: number,
  password: string,
): Promise<boolean> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return false;
  }

  return bcrypt.compare(password, user.passwordHash);
};
