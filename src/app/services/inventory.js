import { axiosClient } from './index';

export const getInventory = async ({ item_ids, vault, zone, box, slot, row, offset, limit, order } = {}) => {
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
            return
        } else {

        }

        Object.keys(params)
    }

    return axiosClient
        .get(`/inventory${params.item_ids.length > 0 && (`?item_ids=${params.item_ids.toString().replaceAll(',', '%')}`)}`)
        .then((res) => {
            return res.data;

        });
};

export const postInventory = async (item) => {
    // TODO: validate item
    return axiosClient.post(`/inventory`, item).then((res) => {
        return res;
    });
};

export const putInventory = async (id, item) => {
    // TODO: validate item
    return axiosClient.put(`/inventory/${id}`, item).then((res) => {
        return res;
    });
};
