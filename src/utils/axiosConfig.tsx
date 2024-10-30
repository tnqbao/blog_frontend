import axios, { AxiosInstance } from 'axios';

const createUserApiInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_USER_API,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '5000', 10),
  });

  instance.interceptors.request.use(config => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      config.headers.Authorization = `${jwt}`;
    }
    return config;
  });

  return instance;
};

export const userApiInstance = createUserApiInstance();
