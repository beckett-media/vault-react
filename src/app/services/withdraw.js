const axios = require('axios');
import config from '../../config';

export const withdrawItem = async (itemId) => {
  return await axios
    .delete(`${config.BASE_URL}/marketplace/vaulting/${itemId}`);
};
