import { AxiosRequestConfig, AxiosResponse } from 'axios';

export type Params = {
  config: AxiosRequestConfig;
  status: number;
  request: XMLHttpRequest;
  response: AxiosResponse;
};

export class ApiError extends Error {
  public config: AxiosRequestConfig;
  public status: number;
  public request: XMLHttpRequest;
  public response: any;

  constructor(params: Params) {
    const { config, status, request, response } = params;
    super(response.data.message);
    this.config = config;
    this.status = status;
    this.request = request;
    this.response = response;
  }
}

export function isApiError(error: any): error is ApiError {
  return error && error.status && error instanceof Error;
}

export function isServerError(error: any): boolean {
  return isApiError(error) && error.status > 500;
}
