import { Prisma } from "../../../../../generated/prisma";
import type { IOmegaPayWebhookPayload, IOmegaPayWebhookReceipt } from "@/domain/acquirer/omegapay-webhook";
import type { IOmegaPayWebhookRepository } from "@/domain/repositories/omegapay-webhook.repository";
import { OmegaPayWebhookEventEnum } from "@/domain/enums/omegapay.enum";
import { BasePrismaRepository } from "@/infra/database/prisma/repositories/base-prisma.repository";

export class PrismaOmegaPayWebhookRepository
  extends BasePrismaRepository
  implements IOmegaPayWebhookRepository
{
  async save(payload: IOmegaPayWebhookPayload): Promise<IOmegaPayWebhookReceipt> {
    const row = await this.getPrismaClient().omegaPayWebhookEvent.create({
      data: {
        event: payload.event,
        token: payload.token,
        payload: payload as unknown as Prisma.InputJsonValue,
      },
    });

    return {
      id: row.id,
      event: row.event as OmegaPayWebhookEventEnum,
      token: row.token,
      receivedAt: row.receivedAt,
    };
  }
}
