/*
  Warnings:

  - You are about to drop the column `github` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `location` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "github",
DROP COLUMN "linkedin",
DROP COLUMN "twitter",
ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "linkedinUrl" TEXT,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "twitterUrl" TEXT;

-- CreateTable
CREATE TABLE "Experience" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT NOT NULL,
    "skills" TEXT[],
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);
