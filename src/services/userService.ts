import axios from "axios";
import { UserInterface } from "../types/Product";

const URL_API = "http://localhost:5000";

export const getUserService = async () => {
  try {
    const response = await axios.get(`${URL_API}/api/v1/user`);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    throw error;
  }
};

export const addUserService = async (userData: UserInterface) => {
  console.log("Dữ liệu gửi backend", userData);

  const formData = new FormData();
  formData.append("username", userData.username);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("role", userData.role);
  formData.append("fullName", userData.fullName);
  formData.append("phoneNumber", userData.phoneNumber);
  formData.append("address", userData.address);

  // Sửa cách xử lý avatar
  if (userData.avatar) {
    formData.append("avatar", userData.avatar);
  }

  try {
    const response = await axios.post(`${URL_API}/api/v1/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Lỗi chi tiết:", error.response?.data);
      throw new Error(error.response?.data?.message || "Lỗi khi thêm người dùng");
    }
    throw new Error("Lỗi không xác định");
  }
};
export const getUserById = async (_id: string) => {
  const response = await axios.get(`${URL_API}/api/v1/update/${_id}`);
  return response.data;
};
export const Update_Service = async (_id: string, userData: UserInterface) => {
  const formData = new FormData();
  formData.append("username", userData.username);
  formData.append("email", userData.email);
  formData.append("password", userData.password);
  formData.append("role", userData.role);
  formData.append("fullName", userData.fullName);
  formData.append("phoneNumber", userData.phoneNumber);
  formData.append("address", userData.address);

  if (userData.avatar) {
    formData.append("avatar", userData.avatar);
  }
  try {
    const response = await axios.put(`${URL_API}/api/v1/update/${_id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Response từ backend:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Lỗi chi tiết:", error.response?.data);
      throw new Error(error.response?.data?.message || "Lỗi khi thêm người dùng");
    }
    throw new Error("Lỗi không xác định");
  }
};
export const delete_User_service = async (_id:string)=>{
  try
  {
    const response = await axios.delete(`${URL_API}/api/v1/del/${_id}`,{
      headers:{ "Content-Type":"application/json"},
    });
    return response.data;
  }catch(e){
    console.error("lỗi khi xóa sản phẩm",e)
    throw e;
  }
}
