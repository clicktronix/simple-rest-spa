import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type HttpActionParams = {
  url: string;
  options?: AxiosRequestConfig;
  data?: any;
};

export type InterceptorErrorResponse = {
  status: number;
  message: string;
  config: AxiosRequestConfig;
  response: AxiosResponse;
  request: XMLHttpRequest;
  data?: any
};

export type Converter<R, T> = (resp: R) => T;

export type Interceptors = {
  refreshTokenInterceptor: () => Promise<void>;
};

export type DataResponse<R> = {
  data: R;
  request: XMLHttpRequest;
};

export type ErrorResponse = {
  message?: string;
  code?: number;
};
