import { handleAxiosError } from '../../helpers/axios.helper';
import { ApiService } from '../../services/ApiService';
import { StorageService } from '../../services/StorageService';
import { ApiResponse } from '../../types/api-response';
import { RegisterAccountDto } from './dto/create.dto';
import { LoginDto, LoginResponse } from './dto/login.dto';

const baseUrl = 'auth';

export class AuthService extends ApiService {
  async register(dto: RegisterAccountDto): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await this.axios.post(`/${baseUrl}/register`, dto);

      const { access_token, account } = response.data;

      return {
        statusCode: response.status,
        result: {
          token: access_token,
          user: account,
        },
      };
    } catch (error) {
      return handleAxiosError(error);
    }
  }

  async login(dto: LoginDto): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await this.axios.post(`/${baseUrl}/login`, dto);

      const { access_token, account } = response.data;

      return {
        statusCode: response.status,
        result: {
          token: access_token,
          user: account,
        },
      };
    } catch (error) {
      return handleAxiosError(error);
    }
  }

  logout() {
    StorageService.removeLoginData();
  }
}
