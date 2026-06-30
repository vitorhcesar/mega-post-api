-- AlterTable
ALTER TABLE "publication" ADD COLUMN "objectKeys" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- Backfill existing rows
UPDATE "publication" SET "objectKeys" = ARRAY["objectKey"] WHERE "objectKey" IS NOT NULL AND cardinality("objectKeys") = 0;
