import config from '../../config';

const axios = require('axios');

export const getHistory = async (userName) => {
  
  return userName && axios
    .get(`${config.BASE_URL}/marketplace/action/user/${userName}`)
    .then((res) => {
      console.log('ran and got: ', userName, res)
      return res;
    }).catch(err => console.log('ran and got: ', userName, err));
};