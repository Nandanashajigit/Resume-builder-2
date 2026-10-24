import axiosInstance from "./axiosInstance";

const axiosService = async (method, url, data) => {
    try {
        return await axiosInstance({ method, url, data });
    } catch (err) {
        return err.response || err;
    }
};

export default axiosService;