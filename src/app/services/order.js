import { axiosClient } from "./index";

export const getOrders = async ({ user, status, offset, limit, order } = {}) => {
    const params = {
        user,
        status,
        offset,
        limit,
        order,
    };

    return axiosClient
        .get(`/marketplace/order`, {
            params: Object.keys(params).length > 0 ? params : undefined,
        })
        .then((res) => {
            return res.data;
        });
};

export const getSingleOrder = async (orderId) => {
    return axiosClient.get(`/marketplace/order/${orderId}`).then((res) => {
        return res.data;
    });
};