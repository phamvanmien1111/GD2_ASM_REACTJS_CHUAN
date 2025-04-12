import { useState, useEffect, useCallback } from 'react'
import { useAdminUserStore } from '../store/AdminUser_store'
import { getUserService, addUserService, delete_User_service ,Update_Service } from '../services/userService'
import { UserInterface } from '../types/Product'

export const Admin_User_Hook = () => {
    const { user, setUser, addUser } = useAdminUserStore();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            const data = await getUserService();
            setUser(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu", error);
            setError("Lỗi khi cập nhật dữ liệu");
        } finally {
            setLoading(false);
        }
    }, [setUser]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleAddUser = async (newUser: UserInterface) => {
        try {
            setLoading(true);
            const addedUser = await addUserService(newUser);
            addUser(addedUser);
            console.log("Dữ liệu user sau khi cập nhật API:",addedUser)
            return true; 
        } catch (error) {
            console.error("Lỗi khi thêm người dùng", error);
            setError("Lỗi khi thêm người dùng");
            return false; 
        } finally {
            setLoading(false);
        }
    };
   const handleCreateUser = async (data: UserInterface) => {
  try {
    const response = await Update_Service(data._id, data); 
    console.log("Kết quả từ API:", response);
    return response;
  } catch (error) {
    console.error("Lỗi khi cập nhật người dùng:", error);
    throw error;
  }
};
    const handleDelete = async (_id:string)=>{
        try{
            await delete_User_service(_id);
            setUser(user.filter((user)=>user._id !== _id));
        }
        catch(e){
            console.error("lỗi khi xóa sản phẩm",e);
            throw e
        }
    }
    return { 
        user: Array.isArray(user) ? user : [], 
        loading, 
        error, 
        handleAddUser,
        refresh: fetchUsers,
        handleDelete ,
        handleCreateUser
    };
};