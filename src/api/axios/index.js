import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    console.error({err})
  }
);
export default axiosInstance;
