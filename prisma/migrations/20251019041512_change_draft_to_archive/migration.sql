/*
  Warnings:

  - The values [DRAFT] on the enum `BlogStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BlogStatus_new" AS ENUM ('ARCHIVED', 'PUBLISHED');
ALTER TABLE "Blog" ALTER COLUMN "status" TYPE "BlogStatus_new" USING ("status"::text::"BlogStatus_new");
ALTER TYPE "BlogStatus" RENAME TO "BlogStatus_old";
ALTER TYPE "BlogStatus_new" RENAME TO "BlogStatus";
DROP TYPE "BlogStatus_old";
COMMIT;
