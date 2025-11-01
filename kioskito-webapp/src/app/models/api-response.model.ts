export interface ApiResponse<T> {
  title: string;
  statusCode: number;
  detail: string;
  data: T;
}
