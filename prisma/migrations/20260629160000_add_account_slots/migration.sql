-- AlterTable
ALTER TABLE "instagram_oauth_state" ADD COLUMN "accountSlotId" TEXT;

-- CreateTable
CREATE TABLE "account_slot" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "instagramConnectedAccountId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_slot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_slot_instagramConnectedAccountId_key" ON "account_slot"("instagramConnectedAccountId");

-- CreateIndex
CREATE INDEX "account_slot_userId_idx" ON "account_slot"("userId");

-- CreateIndex
CREATE INDEX "account_slot_status_idx" ON "account_slot"("status");

-- CreateIndex
CREATE INDEX "account_slot_expiresAt_idx" ON "account_slot"("expiresAt");

-- AddForeignKey
ALTER TABLE "account_slot" ADD CONSTRAINT "account_slot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account_slot" ADD CONSTRAINT "account_slot_instagramConnectedAccountId_fkey" FOREIGN KEY ("instagramConnectedAccountId") REFERENCES "instagram_connected_account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
