import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';

import { InterceptorErrorResponse, HttpActionParams, Interceptors } from './types';

class HttpActions {
  private request: AxiosInstance;
  private isRefreshing: boolean = false;

  constructor(baseURL: string, headers?: AxiosRequestConfig['headers']) {
    this.request = axios.create({
      baseURL,
      headers,
      withCredentials: false,
    });
  }

  public get<T>({ url, data, options }: HttpActionParams): AxiosPromise<T> {
    const config: AxiosRequestConfig = {
      data, ...options,
    };
    return this.request.get(url, config);
  }

  public post<T>({ url, data, options }: HttpActionParams): AxiosPromise<T> {
    return this.request.post(url, data, options);
  }

  public patch<T>({ url, data, options }: HttpActionParams): AxiosPromise<T> {
    return this.request.patch(url, data, options);
  }

  public del<T>({ url, data, options }: HttpActionParams): AxiosPromise<T> {
    const config: AxiosRequestConfig = {
      url, data, ...options,
    };
    return this.request.delete(url, config);
  }

  public put<T>({ url, data, options }: HttpActionParams): AxiosPromise<T> {
    return this.request.put(url, data, { ...options });
  }

  public initInterceptors({ refreshTokenInterceptor }: Interceptors) {
    this.request.interceptors.response.use(
      response => response,
      (error: InterceptorErrorResponse) => {
        const { response, config } = error;

        if (config.url === '/authenticate/refresh') {
          return error;
        }

        if (response.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          refreshTokenInterceptor().catch(e => e).finally(() => {
            this.isRefreshing = false;
          });
        }

        return error;
      },
    );
  }
}

export { HttpActions };
