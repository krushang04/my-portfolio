/*
  Warnings:

  - Made the column `description` on table `Education` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Education" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "achievements" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Experience" ALTER COLUMN "description" DROP NOT NULL;
