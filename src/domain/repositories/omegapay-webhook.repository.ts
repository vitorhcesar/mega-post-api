import type { IOmegaPayWebhookPayload, IOmegaPayWebhookReceipt } from "@/domain/acquirer/omegapay-webhook";

export interface IOmegaPayWebhookRepository {
  save(payload: IOmegaPayWebhookPayload): Promise<IOmegaPayWebhookReceipt>;
}
