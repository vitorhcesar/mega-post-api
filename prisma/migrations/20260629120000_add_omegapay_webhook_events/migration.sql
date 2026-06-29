-- CreateTable
CREATE TABLE "omegapay_webhook_event" (
    "id" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "omegapay_webhook_event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "omegapay_webhook_event_event_idx" ON "omegapay_webhook_event"("event");

-- CreateIndex
CREATE INDEX "omegapay_webhook_event_receivedAt_idx" ON "omegapay_webhook_event"("receivedAt");
