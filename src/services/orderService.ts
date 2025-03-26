import axios from "axios";
const API_URL = "http://localhost:5000";
export const getOrder = async () => {
  const response = await axios.get(`${API_URL}/api/v1/orders`);
  return response.data;
};
