/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable  @typescript-eslint/no-unsafe-member-access */
/* eslint-disable  no-console */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiUrls } from './ApiConstants';

const unAuthRoutes: string[] = [ApiUrls.todos];

const API_TIMEOUT = 10000;

const instance = axios.create({
  timeout: API_TIMEOUT,
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    let newConfig = config;
    const configUrl = config.url ?? '';
    try {
      const isTokenRequired = !unAuthRoutes.includes(configUrl);
      if (isTokenRequired) {
        const token = '';
        newConfig = {
          ...newConfig,
          headers: {
            ...newConfig.headers,
            Authorization: `Bearer ${token}`,
          },
          timeout: API_TIMEOUT,
        };
      } else {
        newConfig = {
          ...newConfig,
          headers: {
            ...newConfig.headers,
            //'Accept-Encoding': 'gzip,deflate,compress',
          },
          timeout: API_TIMEOUT,
        };
      }
    } catch (e) {
      console.error(e);
    }
    return newConfig;
  },
  (e) => {
    return Promise.reject(e);
  },
);

/**
 * Handle all responses. It is possible to add handlers
 * for requests, but it is omitted here for brevity.
 */
instance.interceptors.response.use(
  (res: AxiosResponse) => res.data,
  (err) => {
    if (err.response) {
      return Promise.reject(err.response.data);
    }

    if (err.request) {
      return Promise.reject(err.request);
    }

    return Promise.reject(err.message);
  },
);

export const makeGetRequest = <T>(URL: string) => instance.get<T>(URL);
export const makePostRequest = <T>(URL: string, data = {}) => instance.post<T>(URL, { ...data });
export const makePutRequest = <T>(URL: string, data = {}) => instance.put<T>(URL, { ...data });
export const makePatchRequest = <T>(URL: string, data = {}) => instance.patch<T>(URL, { ...data });
export const makeDeleteRequest = <T>(URL: string) => instance.delete<T>(URL);
