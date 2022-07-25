const axios = require('axios');
const axiosRetry = require('axios-retry');

import config from '../../config';

export const SUBMISSION_STATUS = {
  Failed: 0,
  Submitted: 1,
  Received: 2,
  Rejected: 3,
  Approved: 4,
  Vaulted: 5,
};

export const postSubmission = async (item) => {
  // TODO: validate item
  axiosRetry(axios, { retries: 3 });
  return axios.post(`${config.BASE_URL}/marketplace/submission`, item).then((res) => {
    return res;
  });
};

export const getSubmissions = async (user) => {
  return axios
    .get(`${config.BASE_URL}/marketplace/submission`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
      },
      params: {
        user: user
      }
    })
};

export const getSubmissionsByStatus = async (user, status) => {
  return axios
    .get(`${config.BASE_URL}/marketplace/submission`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
      },
      params: {
        user: user,
        status: status
      }
  })
}

export const getSingleSubmission = async (submissionId) => {
  return axios.get(`${config.BASE_URL}/marketplace/submission/${submissionId}`).then((res) => {
    return res.data;
  });
};

export const approveRejectSubmissions = (subId, approve = true) => {
  return axios
    .put(`${config.BASE_URL}/marketplace/submission/${subId}`, {
      status: approve ? SUBMISSION_STATUS.Approved : SUBMISSION_STATUS.Rejected,
    })
    .then((res) => {
      return res.data;
    });
};
