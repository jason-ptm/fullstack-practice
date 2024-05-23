import Axios from 'axios';

export class ApiService {
  protected readonly axios = Axios.create({
    baseURL: import.meta.env.VITE_API_URL || '',
  });
}
