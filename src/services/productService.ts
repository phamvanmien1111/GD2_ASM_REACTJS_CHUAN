// import axios from "axios";
// const API_URL = "http://localhost:5000";
// export const getProducts = async () => {
//   const response = await axios.get(`${API_URL}/api/v1/home`);
//   return response.data;
// };

import axios from "axios";
const API_URL = "http://localhost:5000";

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/api/v1/home`);
  return response.data;
};

export const createProduct = async (productData: { 
  name: string; 
  price: number; 
  category: string; 
  status: string; 
  image: File;
  description: string;
  stock: number; 
}) => {
  console.log("📤 Dữ liệu gửi đi:", productData); 

  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("price", productData.price.toString()); 
  formData.append("category", productData.category);
  formData.append("status", productData.status);
  formData.append("description", productData.description);
  formData.append("stock", productData.stock.toString()); 
  formData.append("image", productData.image); 

  try {
    const response = await axios.post(`${API_URL}/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("✅ Phản hồi từ server:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Lỗi khi gửi sản phẩm:", error);
  }
};
