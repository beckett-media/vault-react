const axios = require('axios');
const axiosRetry = require('axios-retry');

import config from '../../config';

export const postSubmission = async (item) => {
  // TODO: validate item
  axiosRetry(axios, { retries: 3 });
  return axios.post(`${config.BASE_URL}/marketplace/submission`, item).then((res) => {
    return res;
  });
};

export const getSubmissions = async () => {
  return axios
    .get(`${config.BASE_URL}/marketplace/submission`, {
      params: { status: 1 },
    })
    .then((res) => {
      return res;
    });
};

export const approveRejectSubmissions = (approve = true) => {
  return axios
    .put(`${config.BASE_URL}/marketplace/submission`, {
      params: { approve },
    })
    .then((res) => {
      return res;
    });
};
