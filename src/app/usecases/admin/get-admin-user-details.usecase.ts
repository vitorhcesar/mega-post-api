import { AppError } from "@/http/services/app/errors/app.error";
import type { IUserRepository } from "@/domain/repositories/user.repository";
import { mapUserToDto } from "@/app/usecases/user/map-user-to-dto.util";
import type { IAdminUserDetailsDto } from "@/app/usecases/admin/dto/admin-user.dto";

export class GetAdminUserDetailsUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string): Promise<IAdminUserDetailsDto> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404, "user_not_found");
    }

    const instagramAccountsCount =
      await this.userRepository.countInstagramAccountsByUserId(userId);

    return {
      ...mapUserToDto(user),
      instagramAccountsCount,
    };
  }
}
