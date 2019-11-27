export default interface IApiResponse<T> {
  success: boolean;
  data: T;
  paginator: {
    page: number;
    size: number;
    totalPages: number;
    totalRows: number;
  };
}
