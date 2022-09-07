import { axiosClient } from './index';

export const getInventory = async ({ item_ids, vault, zone, box, slot, row, offset, limit, order } = {}) => {
  const queryString = require('query-string');
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

export const deleteInventory = async (inventory_id) => {
  // TODO: validate item
  return axiosClient.delete(`/inventory/${inventory_id}`).then((res) => {
    return res;
  });
};

export const getInventoryZoneOptions = () => {
  return [
    'Cabinet 1',
    'Cabinet 2',
    'Cabinet 3',
    'Cabinet 4',
    'Cabinet 5',
    'Cabinet 6',
    'Cabinet 7',
    'Cabinet 8',
    'Credenza 1',
    'Credenza 2',
    'Credenza 3',
    'Credenza 4',
    'Credenza 5',
    'Credenza 6',
    'Credenza 7',
    'Credenza 8',
    'Main Display Case',
    'Pedestal 1',
    'Pedestal 2',
    'Comics Gallery Wall',
    'Card Gallery Wall',
  ];
};
