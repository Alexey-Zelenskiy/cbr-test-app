import axios from 'axios';

export const axiosApiInstance = axios.create();

axiosApiInstance.interceptors.request.use(
  async (config) => {
    config.withCredentials = false;
    config.headers = {
      Accept: 'text/xml'
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
