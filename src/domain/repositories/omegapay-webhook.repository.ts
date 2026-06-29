import type { IOmegaPayWebhookPayload, IOmegaPayWebhookReceipt } from "@/domain/acquirer/omegapay-webhook";
import type {
  IOmegaPayWebhookCountParams,
  IOmegaPayWebhookDetail,
  IOmegaPayWebhookListItem,
  IOmegaPayWebhookListParams,
} from "@/domain/acquirer/omegapay-webhook-list";

export interface IOmegaPayWebhookRepository {
  save(payload: IOmegaPayWebhookPayload): Promise<IOmegaPayWebhookReceipt>;
  findMany(params: IOmegaPayWebhookListParams): Promise<IOmegaPayWebhookListItem[]>;
  count(params: IOmegaPayWebhookCountParams): Promise<number>;
  findById(id: string): Promise<IOmegaPayWebhookDetail | null>;
}
