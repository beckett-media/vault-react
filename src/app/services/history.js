import { axiosClient } from './index';

export const getHistory = async (userName) => {
  return (
    userName &&
    axiosClient
      .get(`/marketplace/action/user/${userName}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err
      })
  );
};
