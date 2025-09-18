/*
  Warnings:

  - You are about to drop the `BlogImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `coverImg` to the `Blog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BlogImage" DROP CONSTRAINT "BlogImage_blogId_fkey";

-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "coverImg" TEXT NOT NULL,
ADD COLUMN     "imgUrls" TEXT[];

-- DropTable
DROP TABLE "BlogImage";

-- CreateTable
CREATE TABLE "UserImage" (
    "id" SERIAL NOT NULL,
    "cloudId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserImage_cloudId_key" ON "UserImage"("cloudId");

-- CreateIndex
CREATE UNIQUE INDEX "UserImage_url_key" ON "UserImage"("url");

-- CreateIndex
CREATE INDEX "UserImage_url_idx" ON "UserImage"("url");

-- AddForeignKey
ALTER TABLE "UserImage" ADD CONSTRAINT "UserImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
