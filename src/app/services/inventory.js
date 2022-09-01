import { axiosClient } from './index';

export const getInventory = async ({ item_ids, vault, zone, box, slot, row, offset, limit, order } = {}) => {
  const queryString = require('query-string');
  console.log(item_ids);
  const params = {
    item_ids,
    vault,
    zone,
    box,
    slot,
    row,
    offset,
    limit,
    order,
  };

  const listParams = (params) => {
    if (Object.values(params).length === 0) {
      return;
    } else {
      return queryString.stringify(params, {
        arrayFormat: 'separator',
        arrayFormatSeparator: '%',
        skipEmptyString: true,
      });
    }
  };

  return axiosClient.get(`/inventory${'?' + listParams(params)}`).then((res) => {
    return res.data;
  });
};

export const postInventory = async (item) => {
  // TODO: validate item
  return axiosClient.post(`/inventory`, item).then((res) => {
    return res;
  });
};

export const putInventory = async (inventory_id, item) => {
  // TODO: validate item
  return axiosClient.put(`/inventory/${inventory_id}`, item).then((res) => {
    return res;
  });
};
