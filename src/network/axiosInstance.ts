import { BACKEND } from '@/config-global';
import axios from 'axios';

export const instance = axios.create({
  baseURL: `${BACKEND}`,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);
