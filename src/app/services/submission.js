import { axiosClient } from './index';

export const SUBMISSION_STATUS = Object.freeze({
  Failed: 0,
  Submitted: 1,
  Received: 2,
  Rejected: 3,
  Approved: 4,
  Vaulted: 5,
});

export const postSubmission = async (item) => {
  // TODO: validate item
  return axiosClient.post(`/marketplace/submission`, item).then((res) => {
    return res;
  });
};

export const updateSubmission = async (id, item) => {
  // TODO: validate item
  console.log(item);
  return axiosClient.put(`/marketplace/submission/${id}`, item).then((res) => {
    return res.data;
  });
};

export const getSubmissions = async ({
  submissionIds,
  submissionOrderIds,
  user,
  userUuids,
  status,
  offset,
  limit,
  order,
} = {}) => {
  const params = {
    user,
    user_uuids: (userUuids || []).join(','),
    submission_ids: (submissionIds || []).join(','),
    submission_order_ids: (submissionOrderIds || []).join(','),
    status,
    offset,
    limit,
    order,
  };

  for (const key of Object.keys(params)) {
    if (!params[key]) {
      delete params[key];
    }
  }

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

export const approveRejectSubmissions = (subId, type, approve = true) => {
  return axiosClient
    .put(`/marketplace/submission/${subId}`, {
      type,
      status: approve ? SUBMISSION_STATUS.Approved : SUBMISSION_STATUS.Rejected,
    })
    .then((res) => {
      return res.data;
    });
};

export const deleteOrder = (subIds) => {
  return axiosClient.put(`/marketplace/submission?submission_order_ids=${subIds}&is_active=false`).then((res) => {
    return res.data;
  });
};

export const deleteSubmission = (subId) => {
  return axiosClient
    .put(`/marketplace/submission/${subId}`, {
      is_active: false,
    })
    .then((res) => {
      return res.data;
    });
};

export const undeleteSubmission = (subId) => {
  return axiosClient
    .put(`/marketplace/submission/${subId}`, {
      is_active: true,
    })
    .then((res) => {
      return res.data;
    });
};

export const confirmSubmissionReceipt = (subId, type) => {
  return axiosClient
    .put(`/marketplace/submission/${subId}`, {
      type,
      status: SUBMISSION_STATUS.Received,
    })
    .then((res) => {
      return res.data;
    });
};

export const getAllSubmissions = () => {
  return axiosClient.get(`/marketplace/submission`).then((res) => {
    return res.data;
  });
};
