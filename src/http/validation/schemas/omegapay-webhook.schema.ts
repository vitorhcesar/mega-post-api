import { z } from "zod";
import { OmegaPayWebhookEventEnum } from "@/domain/enums/omegapay.enum";

export const omegaPayWebhookBodySchema = z
  .object({
    event: z.nativeEnum(OmegaPayWebhookEventEnum),
    token: z.string().min(1),
    offerCode: z.string().nullable().optional(),
    checkoutUrl: z.string().optional(),
    client: z.record(z.unknown()).optional(),
    transaction: z.record(z.unknown()).optional(),
    subscription: z.record(z.unknown()).nullable().optional(),
    orderItems: z.array(z.record(z.unknown())).optional(),
    trackProps: z.record(z.unknown()).optional(),
  })
  .passthrough();

export type TOmegaPayWebhookBody = z.infer<typeof omegaPayWebhookBodySchema>;
