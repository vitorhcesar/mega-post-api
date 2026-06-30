import {
  SLOT_COMBO_DISCOUNT_RATE,
  SLOT_COMBO_QUANTITIES,
  SLOT_PRICE_BRL,
  type SlotComboQuantity,
} from "@/domain/enums/account-slot.enum";

export function calculateSlotPurchaseTotal(input: {
  quantity?: number;
  combo?: SlotComboQuantity;
}): { quantity: number; unitPrice: number; total: number; hasDiscount: boolean } {
  if (input.combo !== undefined) {
    if (!SLOT_COMBO_QUANTITIES.includes(input.combo)) {
      throw new Error("Invalid combo quantity");
    }

    const unitPrice = Number((SLOT_PRICE_BRL * (1 - SLOT_COMBO_DISCOUNT_RATE)).toFixed(2));
    const total = Number((input.combo * unitPrice).toFixed(2));

    return {
      quantity: input.combo,
      unitPrice,
      total,
      hasDiscount: true,
    };
  }

  const quantity = input.quantity ?? 0;

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("Invalid quantity");
  }

  const total = Number((quantity * SLOT_PRICE_BRL).toFixed(2));

  return {
    quantity,
    unitPrice: SLOT_PRICE_BRL,
    total,
    hasDiscount: false,
  };
}

export function getSlotPricingCatalog() {
  return {
    unitPrice: SLOT_PRICE_BRL,
    comboDiscountRate: SLOT_COMBO_DISCOUNT_RATE,
    combos: SLOT_COMBO_QUANTITIES.map((quantity) => {
      const pricing = calculateSlotPurchaseTotal({ combo: quantity });

      return {
        quantity,
        unitPrice: pricing.unitPrice,
        total: pricing.total,
        savings: Number((quantity * SLOT_PRICE_BRL - pricing.total).toFixed(2)),
      };
    }),
  };
}

export function addSlotDuration(from: Date = new Date()): Date {
  const expiresAt = new Date(from);
  expiresAt.setDate(expiresAt.getDate() + 30);
  return expiresAt;
}
