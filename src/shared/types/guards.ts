import { DataResponse } from './response';

export function isDataResponse<R>(data: any): data is DataResponse<R> {
  return Boolean(data.data);
}
