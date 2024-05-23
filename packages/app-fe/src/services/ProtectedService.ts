import { AxiosResponse } from 'axios';
import { ApiService } from './ApiService';
import { StorageService } from './StorageService';

export class ProtectedService extends ApiService {
  constructor() {
    super();

    const accessToken = StorageService.getAccessToken();

    if (!accessToken)
      throw new Error('the access token is required to access this service');

    this.axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    this.axios.interceptors.response.use(
      (response) => response,
      (error: AxiosResponse) => {
        if (error.request?.status === 401) {
          StorageService.removeLoginData();
        }
        return error;
      }
    );
  }
}
