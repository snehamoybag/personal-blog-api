/*
  Warnings:

  - You are about to drop the `AvatarImage` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[avatarUrl]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "AvatarImage" DROP CONSTRAINT "AvatarImage_profileId_fkey";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "avatarUrl" TEXT;

-- DropTable
DROP TABLE "AvatarImage";

-- CreateIndex
CREATE UNIQUE INDEX "Profile_avatarUrl_key" ON "Profile"("avatarUrl");
