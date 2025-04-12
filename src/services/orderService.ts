import axios from "axios";
const API_URL = "http://localhost:5000";
export const getOrder = async () => {
  const response = await axios.get(`${API_URL}/api/v1/orders`);
  return response.data;
};
export const updateOrderStatus = async (id: string, newStatus: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/update_order/${id}`, {
      status: newStatus,
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật:', error);
  }
};
export const getStatistics = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/v5/thongke`);
    return response.data.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật:', error);
  }
};