import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type HttpActionParams = {
  url: string;
  options?: AxiosRequestConfig;
  data?: any;
};

export type ErrorResponse = {
  status: number;
  message: string;
  config: AxiosRequestConfig;
  response: AxiosResponse;
  request: XMLHttpRequest;
  data?: any
};

export type Interceptors = {
  refreshTokenInterceptor: () => Promise<void>;
};
