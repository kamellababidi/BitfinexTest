import axios from 'axios';

const axiosParams = {
  baseURL: 'https://api-pub.bitfinex.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 50000,
};

const axiosInstance = axios.create(axiosParams);

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response.status !== 200) {
      // show error
      console.log(' error status -- >', error.response.status);
    }
    return Promise.reject(error);
  },
);

const { get, post, put, delete: destroy, patch } = axiosInstance;
export { get, post, put, destroy, patch };
export default axiosInstance;
