import axios from 'axios';
import config from '../../config';

export const axiosClient = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
    Accpet: 'application/json',
  },
});
