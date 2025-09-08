import { Profile, User } from "../generated/prisma";

export type SafeUser = Omit<User, "passwordHash" | "email"> & {
  // WARNNING!: profile can never be null
  // to prevent typescript error we had to use null
  profile: Profile | null;
};
