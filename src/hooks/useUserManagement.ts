import { useState } from "react";
import { useForm } from "react-hook-form";
import { Admin_User_Hook } from "../hooks/AdminUser";
import { UserInterface } from "../types/Product";

export const useUserManagement = () => {
  const { user, loading, error, handleAddUser, refresh ,handleDelete } = Admin_User_Hook();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<UserInterface>();

  const openModal = () => {
    setIsModalOpen(true);
    reset();
  };

  const closeModal = () => setIsModalOpen(false);

  const onSubmit = async (data: UserInterface) => {
    if (!data.avatar || 
        (data.avatar instanceof FileList && data.avatar.length === 0) ||
        (data.avatar instanceof File && !data.avatar.name)) {
      alert("Vui lòng chọn avatar");
      return;
    }

    setIsSubmitting(true);
    try {
      const userData = {
        ...data,
        avatar: data.avatar instanceof FileList ? data.avatar[0] : data.avatar
      };

      const success = await handleAddUser(userData);
      if (success) {
        closeModal();
        await refresh();
        alert("Thêm người dùng thành công");
      }
    } catch (err) {
      console.error("Lỗi khi thêm người dùng:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
    const handleDeleteUser = async (userId: string) => {
      try {
        await handleDelete(userId);
        await refresh();
      } catch (err) {
        console.error("Lỗi khi xóa người dùng:", err);
      }
  };

  return {
    user,
    loading,
    error,
    isModalOpen,
    isSubmitting,
    register,
    handleSubmit,
    errors,
    openModal,
    closeModal,
    onSubmit,
    handleDeleteUser
  };
};
