import { HttpStatusCode, isAxiosError } from 'axios';

export const handleAxiosError = (error: any) => {
  if (isAxiosError(error)) {
    return {
      statusCode: error.response?.status || HttpStatusCode.InternalServerError,
      message: error.response?.data.message,
    };
  } else {
    throw error;
  }
};
