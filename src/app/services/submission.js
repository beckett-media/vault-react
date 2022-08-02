import { axiosClient } from './index';
const { getItems } = require('./items');

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
  return axiosClient.post(`/marketplace/submission`, item).then((res) => {
    return res;
  });
};

export const getSubmissions = async ({ user, status, offset, limit, order } = {}) => {
  const params = {
    user,
    status,
    offset,
    limit,
    order,
  };

  return axiosClient
    .get(`/marketplace/submission`, {
      params: Object.keys(params).length > 0 ? params : undefined,
    })
    .then((res) => {
      return res.data;
    });
};

export const getSingleSubmission = async (submissionId) => {
  return axiosClient.get(`/marketplace/submission/${submissionId}`).then((res) => {
    return res.data;
  });
};

export const approveRejectSubmissions = (subId, approve = true) => {
  return axiosClient
    .put(`/marketplace/submission/${subId}`, {
      status: approve ? SUBMISSION_STATUS.Approved : SUBMISSION_STATUS.Rejected,
    })
    .then((res) => {
      return res.data;
    });
};
