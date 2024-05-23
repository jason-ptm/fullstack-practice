import { ProtectedService } from '../../services/ProtectedService';
import { DeleteUserDto } from './dto/delete.dto';
import { UpdateUserDto } from './dto/update.dto';
import { AccountSchema } from './user.entity';

const baseUrl = 'user';

export class UserService extends ProtectedService {
  async update(dto: UpdateUserDto): Promise<AccountSchema> {
    const response = await this.axios.patch(`/${baseUrl}/`, dto);

    return response.data;
  }

  async delete(dto: DeleteUserDto): Promise<AccountSchema> {
    const response = await this.axios.delete(`/${baseUrl}/${dto.id}`);

    return response.data;
  }
}
