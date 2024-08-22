import toast from "react-hot-toast";
import axiosInstance from "./axios"

export const getProducts = async (skip = 0) => {
  try {
    const response = await axiosInstance.get('/products', {
      params: {
        limit: 10,
        skip
      }
    });
    return { products: response.data?.products, total: response?.data?.total, error: null };
  } catch (error) {
    toast.error('An Error Occurred');
    return { products: [], total: 0, error: error.message || 'Something went wrong' }; 
  }
}