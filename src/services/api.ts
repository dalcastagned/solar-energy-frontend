import axios, { AxiosError, AxiosResponse } from 'axios';

// import { cleanStorage } from '../hooks/auth';

export type Error = {
  status?: number;
  data?: Record<string, unknown>;
  message?: string;
};

export type HttpResponse<DataType> = {
  data?: DataType;
  error?: Error;
};

export type ErrorResponse = {
  response: Error;
  code: string;
};

const responseSuccessHandler = (response: AxiosResponse): AxiosResponse =>
  response;

const forbidden = [401, 403];

const responseErrorHandler = (error: AxiosError): Promise<AxiosError> => {
  const isUnauthorized =
    error.response && forbidden.includes(error.response.status);
  const routers = ['/', '/reset-password'].includes(window.location.pathname);
  if (!routers && isUnauthorized) {
    // cleanStorage();
    window.location.href = '/';
  }

  return Promise.reject(error);
};

const api = axios.create({ baseURL: 'http://localhost:7140/api' });

api.interceptors.response.use(
  response => responseSuccessHandler(response),
  error => responseErrorHandler(error),
);

export default api;
