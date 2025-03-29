import axios from "axios";
import {Product} from "../types/Product"
const API_URL = "http://localhost:5000";

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/api/v1/home`);
  return response.data;
};

export const createProduct = async (productData: Product) => { 
  console.log("Dữ liệu gửi đi:", productData); 

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

    console.log("Phản hồi từ server:", response.data);
    return response.data;
  } catch (error) {
    console.error(" Lỗi khi gửi sản phẩm:", error);
  }
};
export const getProductById = async (id: string) => {
  const response = await axios.get(`${API_URL}/edit/${id}`);
  return response.data;
};

export const updateProduct = async (id: string, productData: Product) => {
  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("price", productData.price.toString());
  formData.append("category", productData.category);
  formData.append("status", productData.status);
  formData.append("description", productData.description);
  formData.append("stock", productData.stock.toString());

  // Kiểm tra nếu có ảnh mới thì gửi, không thì bỏ qua
  if (productData.image && productData.image instanceof File) {
    formData.append("image", productData.image);
  }

  await axios.put(`${API_URL}/edit/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
  export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Xóa sản phẩm thành công!", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    throw error;
  }
};