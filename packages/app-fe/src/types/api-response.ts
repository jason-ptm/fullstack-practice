export type ApiResponse<T> = {
  statusCode: number;
  message?: string;
  result?: T;
};
