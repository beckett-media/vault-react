import config from '../../config';

const axios = require('axios');

export const getHistory = async (userName) => {
  return axios
    .get(`${config.BASE_URL}/marketplace/history`, {
      params: { user_name: userName },
    })
    .then((res) => {
      return res;
    });
};