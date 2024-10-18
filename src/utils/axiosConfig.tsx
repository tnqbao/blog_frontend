import axios, { AxiosInstance } from 'axios';
const createUserApiInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_USER_API,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '5000', 10),
  });
};

export const userApiInstance = createUserApiInstance();
