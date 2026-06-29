import type { OmegaPayWebhookEventEnum } from "@/domain/enums/omegapay.enum";

export interface IOmegaPayWebhookPayload {
  event: OmegaPayWebhookEventEnum;
  token: string;
  offerCode?: string | null;
  checkoutUrl?: string;
  client?: Record<string, unknown>;
  transaction?: Record<string, unknown>;
  subscription?: Record<string, unknown> | null;
  orderItems?: Record<string, unknown>[];
  trackProps?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface IOmegaPayWebhookReceipt {
  id: string;
  event: OmegaPayWebhookEventEnum;
  token: string;
  receivedAt: Date;
}
