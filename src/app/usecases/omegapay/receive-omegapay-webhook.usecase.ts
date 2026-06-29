import type { IOmegaPayWebhookPayload, IOmegaPayWebhookReceipt } from "@/domain/acquirer/omegapay-webhook";
import type { IOmegaPayWebhookRepository } from "@/domain/repositories/omegapay-webhook.repository";

export class ReceiveOmegaPayWebhookUseCase {
  constructor(
    private readonly omegaPayWebhookRepository: IOmegaPayWebhookRepository,
  ) {}

  async execute(payload: IOmegaPayWebhookPayload): Promise<IOmegaPayWebhookReceipt> {
    const receipt = await this.omegaPayWebhookRepository.save(payload);

    const transactionId =
      typeof payload.transaction?.id === "string"
        ? payload.transaction.id
        : undefined;

    console.info("[OmegaPay Webhook] Recebido", {
      id: receipt.id,
      event: receipt.event,
      transactionId,
      receivedAt: receipt.receivedAt.toISOString(),
    });

    return receipt;
  }
}
