-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'client';

-- Migrate legacy role values
UPDATE "user" SET "role" = 'client' WHERE "role" = 'user';
