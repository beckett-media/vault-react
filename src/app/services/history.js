import config from '../../config';

const axios = require('axios');

export const getHistory = async (userName) => {
    return (
      axios
        .get(`${config.BASE_URL}/marketplace/action/user/${userName}`)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return ({
            status: err.response.status,
            data: {
              id: 's0',
              title: err.response.status + ' - ' + err.response.data.error,
              created_at: new Date(),
              status_desc: 'none',
              grading_company: 'none',
              serial_number: 'none',
            }
          })
        }
      )
    )
};
