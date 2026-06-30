import type { IAccountSlotWithAccount } from "@/domain/repositories/account-slot.repository";
import { AccountSlotStatusEnum } from "@/domain/enums/account-slot.enum";
import type { IAccountSlotDto } from "@/app/usecases/account-slot/dto/account-slot.dto";

export function mapAccountSlotToDto(slot: IAccountSlotWithAccount): IAccountSlotDto {
  const isExpired =
    slot.status === AccountSlotStatusEnum.EXPIRED ||
    slot.expiresAt.getTime() < Date.now();

  return {
    id: slot.id,
    status: isExpired ? AccountSlotStatusEnum.EXPIRED : slot.status,
    expiresAt: slot.expiresAt.toISOString(),
    isExpired,
    instagramAccount: slot.instagramAccount,
    createdAt: slot.createdAt.toISOString(),
  };
}
