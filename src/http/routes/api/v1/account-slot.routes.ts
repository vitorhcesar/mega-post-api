import { getAuthContext } from "@/http/client";
import { BaseHttpRoute, type THttpRoute } from "@/http/routes/base-http-route";
import { AppError } from "@/http/services/app/errors/app.error";
import {
  GetAccountSlotPricingUseCase,
  ListAccountSlotsUseCase,
  PurchaseAccountSlotsUseCase,
  RenewAccountSlotUseCase,
} from "@/app/usecases/account-slot/account-slot.usecases";
import { PrismaAccountSlotRepository } from "@/infra/database/prisma/repositories/prisma-account-slot.repository";
import { PrismaWalletRepository } from "@/infra/database/prisma/repositories/prisma-wallet.repository";
import { purchaseAccountSlotsBodySchema } from "@/http/validation/schemas/account-slot.schema";

export class AccountSlotRoutes extends BaseHttpRoute {
  build(): THttpRoute {
    const route = this.serverClient.createUserRoute();
    const accountSlotRepository = new PrismaAccountSlotRepository();
    const walletRepository = new PrismaWalletRepository();

    const getAccountSlotPricingUseCase = new GetAccountSlotPricingUseCase();
    const listAccountSlotsUseCase = new ListAccountSlotsUseCase(accountSlotRepository);
    const purchaseAccountSlotsUseCase = new PurchaseAccountSlotsUseCase(
      accountSlotRepository,
      walletRepository,
    );
    const renewAccountSlotUseCase = new RenewAccountSlotUseCase(
      accountSlotRepository,
      walletRepository,
    );

    route.get("/slots/pricing", async () => {
      const pricing = getAccountSlotPricingUseCase.execute();
      return this.successResponse("OK", pricing, 200);
    });

    route.get("/slots", async (context) => {
      const { authUserId } = getAuthContext(context);
      const slots = await listAccountSlotsUseCase.execute(authUserId!);
      return this.successResponse("OK", slots, 200);
    });

    route.post("/slots/purchase", async (context) => {
      const { authUserId } = getAuthContext(context);
      const body = purchaseAccountSlotsBodySchema.parse(context.body);

      const result = await purchaseAccountSlotsUseCase.execute({
        userId: authUserId!,
        quantity: body.quantity,
        combo: body.combo,
      });

      return this.successResponse("Slots adquiridos com sucesso", result, 201);
    });

    route.post("/slots/:slotId/renew", async (context) => {
      const { authUserId } = getAuthContext(context);
      const { slotId } = context.params;

      if (!slotId) {
        throw new AppError("Slot inválido", 400, "invalid_slot_id");
      }

      const result = await renewAccountSlotUseCase.execute(authUserId!, slotId);
      return this.successResponse("Slot renovado com sucesso", result, 200);
    });

    return route;
  }
}
