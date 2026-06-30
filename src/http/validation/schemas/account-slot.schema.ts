import { z } from "zod";
import { SLOT_COMBO_QUANTITIES } from "@/domain/enums/account-slot.enum";

export const purchaseAccountSlotsBodySchema = z
  .object({
    quantity: z.number().int().min(1).optional(),
    combo: z
      .number()
      .int()
      .refine(
        (value): value is (typeof SLOT_COMBO_QUANTITIES)[number] =>
          SLOT_COMBO_QUANTITIES.includes(value as (typeof SLOT_COMBO_QUANTITIES)[number]),
        { message: "Combo inválido" },
      )
      .optional(),
  })
  .refine(
    (data) =>
      (data.quantity !== undefined && data.combo === undefined) ||
      (data.combo !== undefined && data.quantity === undefined),
    { message: "Informe quantity ou combo" },
  );

export const instagramConnectQuerySchema = z.object({
  slotId: z.string().min(1),
});
