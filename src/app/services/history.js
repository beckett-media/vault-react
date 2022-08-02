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
        return ([{
          data: {
            id: 's0',
            entity_type_desc: err.response.status + ' - ' + err.response.data.error,
            created_at: new Date(),
            status_desc: 'none',
            grading_company: 'none',
            serial_number: 'none',
          }
        }])
      })
  );
};
