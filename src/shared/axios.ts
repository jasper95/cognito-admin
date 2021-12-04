import Axios, { AxiosRequestConfig } from 'axios';

import { useNotificationStore } from '@/shared/stores/notification';

// function authRequestInterceptor(config: AxiosRequestConfig) {
//   const token = storage.getToken();
//   if (token) {
//     config.headers.authorization = `${token}`;
//   }
//   config.headers.Accept = 'application/json';
//   return config;
// }

export const axios = Axios.create({
  baseURL: '/api',
});

// axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    useNotificationStore.getState().addNotification({
      type: 'error',
      message,
    });

    return Promise.reject(error);
  }
);
