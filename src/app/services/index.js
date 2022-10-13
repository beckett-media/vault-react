import axios from 'axios';
import config from '../../config';

export let axiosClient = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
    Accept: 'application/json',
  },
});

export const updateAxiosClient = (token) => {
  axiosClient = axios.create({
    baseURL: config.BASE_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      Accept: 'application/json',
    },
  });
};
