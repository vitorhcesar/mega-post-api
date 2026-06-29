import type { OmegaPayWebhookEventEnum } from "@/domain/enums/omegapay.enum";

export interface IOmegaPayWebhookListItem {
  id: string;
  event: OmegaPayWebhookEventEnum;
  token: string;
  receivedAt: Date;
}

export interface IOmegaPayWebhookDetail extends IOmegaPayWebhookListItem {
  payload: Record<string, unknown>;
}

export interface IOmegaPayWebhookListParams {
  event?: OmegaPayWebhookEventEnum;
  token?: string;
  receivedFrom?: Date;
  receivedTo?: Date;
  skip: number;
  take: number;
}

export interface IOmegaPayWebhookCountParams {
  event?: OmegaPayWebhookEventEnum;
  token?: string;
  receivedFrom?: Date;
  receivedTo?: Date;
}
