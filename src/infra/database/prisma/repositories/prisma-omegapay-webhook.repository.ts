import type { Prisma } from "../../../../../generated/prisma";
import type { IOmegaPayWebhookPayload, IOmegaPayWebhookReceipt } from "@/domain/acquirer/omegapay-webhook";
import type {
  IOmegaPayWebhookCountParams,
  IOmegaPayWebhookDetail,
  IOmegaPayWebhookListItem,
  IOmegaPayWebhookListParams,
} from "@/domain/acquirer/omegapay-webhook-list";
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

  async findMany(
    params: IOmegaPayWebhookListParams,
  ): Promise<IOmegaPayWebhookListItem[]> {
    const rows = await this.getPrismaClient().omegaPayWebhookEvent.findMany({
      where: this.buildWhere(params),
      orderBy: { receivedAt: "desc" },
      skip: params.skip,
      take: params.take,
      select: {
        id: true,
        event: true,
        token: true,
        receivedAt: true,
      },
    });

    return rows.map((row) => ({
      id: row.id,
      event: row.event as OmegaPayWebhookEventEnum,
      token: row.token,
      receivedAt: row.receivedAt,
    }));
  }

  async count(params: IOmegaPayWebhookCountParams): Promise<number> {
    return this.getPrismaClient().omegaPayWebhookEvent.count({
      where: this.buildWhere(params),
    });
  }

  async findById(id: string): Promise<IOmegaPayWebhookDetail | null> {
    const row = await this.getPrismaClient().omegaPayWebhookEvent.findUnique({
      where: { id },
    });

    if (!row) {
      return null;
    }

    return {
      id: row.id,
      event: row.event as OmegaPayWebhookEventEnum,
      token: row.token,
      receivedAt: row.receivedAt,
      payload: row.payload as Record<string, unknown>,
    };
  }

  private buildWhere(
    params: IOmegaPayWebhookCountParams,
  ): Prisma.OmegaPayWebhookEventWhereInput {
    const token = params.token?.trim();

    return {
      ...(params.event ? { event: params.event } : {}),
      ...(token
        ? {
            token: {
              contains: token,
              mode: "insensitive",
            },
          }
        : {}),
      ...((params.receivedFrom || params.receivedTo) && {
        receivedAt: {
          ...(params.receivedFrom ? { gte: params.receivedFrom } : {}),
          ...(params.receivedTo ? { lte: params.receivedTo } : {}),
        },
      }),
    };
  }
}
