import { axiosClient } from './index';

export const postInterestForm = async (formData) => {
  return axiosClient.post(`/interest-form/submission`, formData).then((res) => {
    return res;
  });
};
