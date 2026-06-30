-- Migrate legacy slot status from pending to expired
UPDATE "account_slot" SET "status" = 'expired' WHERE "status" = 'pending';
