import { BaseHttpRoute, type THttpRoute } from "@/http/routes/base-http-route";
import { getAuthContext } from "@/http/client";
import { PrismaUserRepository } from "@/infra/database/prisma/repositories/prisma-user.repository";
import { PrismaInstagramConnectedAccountRepository } from "@/infra/database/prisma/repositories/prisma-instagram-connected-account.repository";
import { PrismaPublicationRepository } from "@/infra/database/prisma/repositories/prisma-publication.repository";
import { GetAdminDashboardMetricsUseCase } from "@/app/usecases/admin/get-admin-dashboard-metrics.usecase";
import { ListAdminUsersUseCase } from "@/app/usecases/admin/list-admin-users.usecase";
import { GetAdminUserDetailsUseCase } from "@/app/usecases/admin/get-admin-user-details.usecase";
import { UpdateAdminUserRoleUseCase } from "@/app/usecases/admin/update-admin-user-role.usecase";
import { AppRoleEnum } from "@/domain/enums/app-role.enum";
import { z } from "zod";

const listUsersQuerySchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

const updateRoleBodySchema = z.object({
  role: z.enum([AppRoleEnum.CLIENT, AppRoleEnum.ADMIN]),
});

export class AdminRoutes extends BaseHttpRoute {
  build(): THttpRoute {
    const route = this.serverClient.createAdminRoute();
    const userRepository = new PrismaUserRepository();
    const instagramAccountRepository =
      new PrismaInstagramConnectedAccountRepository();
    const publicationRepository = new PrismaPublicationRepository();

    const getDashboardMetricsUseCase = new GetAdminDashboardMetricsUseCase(
      userRepository,
      instagramAccountRepository,
      publicationRepository,
    );
    const listAdminUsersUseCase = new ListAdminUsersUseCase(userRepository);
    const getAdminUserDetailsUseCase = new GetAdminUserDetailsUseCase(
      userRepository,
    );
    const updateAdminUserRoleUseCase = new UpdateAdminUserRoleUseCase(
      userRepository,
    );

    route.get("/admin/dashboard/metrics", async () => {
      const metrics = await getDashboardMetricsUseCase.execute();
      return this.successResponse("OK", metrics, 200);
    });

    route.get("/admin/users", async (context) => {
      const query = listUsersQuerySchema.parse(context.query);
      const result = await listAdminUsersUseCase.execute(query);
      return this.successResponse("OK", result, 200);
    });

    route.get("/admin/users/:userId", async (context) => {
      const { userId } = context.params;
      const user = await getAdminUserDetailsUseCase.execute(userId);
      return this.successResponse("OK", user, 200);
    });

    route.patch("/admin/users/:userId/role", async (context) => {
      const { userId } = context.params;
      const { role } = updateRoleBodySchema.parse(context.body);
      const { authUserId } = getAuthContext(context);

      const user = await updateAdminUserRoleUseCase.execute({
        userId,
        role,
        actorUserId: authUserId!,
      });

      return this.successResponse("Papel atualizado", user, 200);
    });

    return route;
  }
}
