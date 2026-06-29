import type { IAdminDashboardMetricsDto } from "@/app/usecases/admin/dto/admin-dashboard.dto";
import type { IUserRepository } from "@/domain/repositories/user.repository";
import type { IInstagramConnectedAccountRepository } from "@/domain/repositories/instagram-connected-account.repository";
import type { IPublicationRepository } from "@/domain/repositories/publication.repository";
import { PublicationTypeEnum } from "@/domain/enums/instagram.enum";

export class GetAdminDashboardMetricsUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly instagramAccountRepository: IInstagramConnectedAccountRepository,
    private readonly publicationRepository: IPublicationRepository,
  ) {}

  async execute(): Promise<IAdminDashboardMetricsDto> {
    const [totalUsers, totalInstagramAccounts, totalPosts, totalStories] =
      await Promise.all([
        this.userRepository.count(),
        this.instagramAccountRepository.countAll(),
        this.publicationRepository.countByType(PublicationTypeEnum.POST),
        this.publicationRepository.countByType(PublicationTypeEnum.STORY),
      ]);

    return {
      totalUsers,
      totalInstagramAccounts,
      totalPosts,
      totalStories,
    };
  }
}
