import { BasePrismaRepository } from "@/infra/database/prisma/repositories/base-prisma.repository";
import type { IInstagramOAuthStateRepository } from "@/domain/repositories/instagram-connected-account.repository";

export class PrismaInstagramOAuthStateRepository
  extends BasePrismaRepository
  implements IInstagramOAuthStateRepository
{
  async create(
    userId: string,
    state: string,
    expiresAt: Date,
    accountSlotId?: string,
  ): Promise<void> {
    await this.getPrismaClient().instagramOAuthState.create({
      data: {
        userId,
        state,
        expiresAt,
        accountSlotId: accountSlotId ?? null,
      },
    });
  }

  async findValidState(
    state: string,
  ): Promise<{ userId: string; accountSlotId: string | null } | null> {
    const row = await this.getPrismaClient().instagramOAuthState.findFirst({
      where: {
        state,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    return row
      ? { userId: row.userId, accountSlotId: row.accountSlotId }
      : null;
  }

  async deleteByState(state: string): Promise<void> {
    await this.getPrismaClient().instagramOAuthState.deleteMany({
      where: { state },
    });
  }
}
