import type { IOmegaPayWebhookRepository } from "@/domain/repositories/omegapay-webhook.repository";
import type { OmegaPayWebhookEventEnum } from "@/domain/enums/omegapay.enum";
import type { IAdminOmegaPayWebhookListDto } from "@/app/usecases/admin/dto/admin-omegapay-webhook.dto";

export interface IListAdminOmegaPayWebhooksInput {
  event?: OmegaPayWebhookEventEnum;
  token?: string;
  receivedFrom?: Date;
  receivedTo?: Date;
  page?: number;
  limit?: number;
}

export class ListAdminOmegaPayWebhooksUseCase {
  constructor(
    private readonly omegaPayWebhookRepository: IOmegaPayWebhookRepository,
  ) {}

  async execute(
    input: IListAdminOmegaPayWebhooksInput = {},
  ): Promise<IAdminOmegaPayWebhookListDto> {
    const page = Math.max(1, input.page ?? 1);
    const limit = Math.min(100, Math.max(1, input.limit ?? 20));
    const skip = (page - 1) * limit;
    const token = input.token?.trim() || undefined;
    const receivedFrom = input.receivedFrom
      ? new Date(
          input.receivedFrom.getFullYear(),
          input.receivedFrom.getMonth(),
          input.receivedFrom.getDate(),
          0,
          0,
          0,
          0,
        )
      : undefined;
    const receivedTo = input.receivedTo
      ? new Date(
          input.receivedTo.getFullYear(),
          input.receivedTo.getMonth(),
          input.receivedTo.getDate(),
          23,
          59,
          59,
          999,
        )
      : undefined;

    const filters = {
      event: input.event,
      token,
      receivedFrom,
      receivedTo,
    };

    const [total, webhooks] = await Promise.all([
      this.omegaPayWebhookRepository.count(filters),
      this.omegaPayWebhookRepository.findMany({
        ...filters,
        skip,
        take: limit,
      }),
    ]);

    return {
      total,
      page,
      limit,
      webhooks: webhooks.map((webhook) => ({
        id: webhook.id,
        event: webhook.event,
        token: webhook.token,
        receivedAt: webhook.receivedAt.toISOString(),
      })),
    };
  }
}
