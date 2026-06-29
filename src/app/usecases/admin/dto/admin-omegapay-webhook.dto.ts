import type { OmegaPayWebhookEventEnum } from "@/domain/enums/omegapay.enum";

export interface IAdminOmegaPayWebhookListItemDto {
  id: string;
  event: OmegaPayWebhookEventEnum;
  token: string;
  receivedAt: string;
}

export interface IAdminOmegaPayWebhookListDto {
  total: number;
  page: number;
  limit: number;
  webhooks: IAdminOmegaPayWebhookListItemDto[];
}

export interface IAdminOmegaPayWebhookDetailsDto
  extends IAdminOmegaPayWebhookListItemDto {
  payload: Record<string, unknown>;
}
