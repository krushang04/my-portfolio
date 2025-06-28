-- AlterTable
ALTER TABLE "Education" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "achievements" SET DEFAULT ARRAY[]::TEXT[];
