import { axiosClient } from './index';

export const getInventory = async ({ item_id, user_uuid, status, offset, limit, order } = {}) => {
    const params = {
        item_id,
        user_uuid,
        status,
        offset,
        limit,
        order,
    };

    return axiosClient
        .get(`/marketplace/inventory`, {
            params: Object.keys(params).length > 0 ? params : undefined,
        })
        .then((res) => {
            return res.data;
        });
};

export const postInventory = async (item) => {
    // TODO: validate item
    return axiosClient.post(`/marketplace/inventory`, item).then((res) => {
        return res;
    });
};

export const updateInventory = async (id, item) => {
    // TODO: validate item
    return axiosClient.put(`/marketplace/inventory/${id}`, item).then((res) => {
        return res;
    });
};


export const getSingleOrder = async (orderId) => {
    return axiosClient.get(`/marketplace/submission/order/${orderId}`).then((res) => {
        return res.data;
    });
};
