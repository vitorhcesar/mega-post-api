export enum AccountSlotStatusEnum {
  ACTIVE = "active",
  EXPIRED = "expired",
}

export const SLOT_PRICE_BRL = 1;
export const SLOT_DURATION_DAYS = 30;
export const SLOT_COMBO_QUANTITIES = [15, 25, 50, 100] as const;
export const SLOT_COMBO_DISCOUNT_RATE = 0.2;

export type SlotComboQuantity = (typeof SLOT_COMBO_QUANTITIES)[number];
