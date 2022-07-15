const axios = require('axios');
const axiosRetry = require('axios-retry');

import config from '../../config';
console.log('config.BaseUrl', config.BASE_URL)
export const postSubmission = async (item) => {
  // TODO: validate item
  axiosRetry(axios, { retries: 3 });
  return axios.post(`${config.BASE_URL}/marketplace/submission`, item).then((res) => {
    return res;
  });
};

export const getSubmissions = async (userName) => {
  return axios
    .get(`${config.BASE_URL}/marketplace/submission`, {
      params: { user_name: userName },
    })
    .then((res) => {
      return res;
    });
};
