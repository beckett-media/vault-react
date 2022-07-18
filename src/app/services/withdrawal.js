const axios = require('axios');
const axiosRetry = require('axios-retry');

import config from '../../config';

export const postWithdrawal = async (item) => {
  // TODO: validate item
  // axiosRetry(axios, { retries: 3 });
  // return axios.post(`${config.BASE_URL}/marketplace/withdrawal`, item).then((res) => {
  //   return res;
  // });
};

export const getWithdrawals = async (userName) => {
  return([{
    withdrawal_id: 1234, 
    title: 'TEST',
    created_at: new Date(), 
    status: 'pending', 
    grading_company: 'BGS',
    serial: 10101010
  }])
  // return axios
  //   .get(`${config.BASE_URL}/marketplace/withdrawal`, {
  //     params: { user_name: userName },
  //   })
  //   .then((res) => {
  //     return res;
  //   });
};
