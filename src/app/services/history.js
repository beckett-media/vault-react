import config from '../../config';

const axios = require('axios');

export const getHistory = async (userName) => {
  return ({
    status: 200,
    data: [{
      id: 'none',
      title: 'Test Submission for History',
      created_at: new Date(),
      status_desc: 'none',
      grading_company: 'none',
      serial_number: 'none',
    }]})
  // return (
  //   userName &&
  //   axios
  //     .get(`${config.BASE_URL}/marketplace/action/user/${userName}`)
  //     .then((res) => {
  //       return res;
  //     })
  //     .catch((err) => console.log('ran and got: ', userName, err))
  // );
};
