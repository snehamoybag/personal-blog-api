/*
  Warnings:

  - You are about to drop the column `coverImgUrl` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `imgUrls` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the `UserImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserImage" DROP CONSTRAINT "UserImage_userId_fkey";

-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "coverImgUrl",
DROP COLUMN "imgUrls";

-- DropTable
DROP TABLE "UserImage";

-- CreateTable
CREATE TABLE "BlogImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "blogId" INTEGER NOT NULL,

    CONSTRAINT "BlogImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogImage_url_key" ON "BlogImage"("url");

-- CreateIndex
CREATE INDEX "BlogImage_url_idx" ON "BlogImage"("url");

-- AddForeignKey
ALTER TABLE "BlogImage" ADD CONSTRAINT "BlogImage_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
