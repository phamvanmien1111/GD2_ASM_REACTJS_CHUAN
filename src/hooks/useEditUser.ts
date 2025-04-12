import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserInterface } from "../types/Product";
import { Admin_User_Hook } from "../hooks/AdminUser";
import { getUserById } from "../services/userService";

export const useEditUser = () => {
  const { id } = useParams(); // ✅ Thống nhất ID
  const navigate = useNavigate();
  const { user, handleCreateUser } = Admin_User_Hook();

  const [preview, setPreview] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);

  const { register, handleSubmit, setValue } = useForm<UserInterface>({
    defaultValues: user.find((u) => u._id === id) || ({} as UserInterface),
  });

  useEffect(() => {
    if (id) {
      getUserById(id).then((data) => {
        if (data) {
          Object.keys(data).forEach((key) => {
            setValue(key as keyof UserInterface, data[key as keyof UserInterface]);
          });
          if (data.avatar) {
            setPreview(`http://localhost:5000/images/${data.avatar}`);
          }
        }
      });
    }
  }, [id, setValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file)); // ✅ Giữ cách tạo URL đúng
    }
  };
  const onSubmit = async (data: UserInterface) => {
    if (!avatar) {
      alert("Vui lòng chọn avatar");
      return;
    }

    try {
      const updatedUser = await handleCreateUser({ ...data, avatar });
      console.log("Dữ liệu user sau khi cập nhật API:", updatedUser);
      alert("Cập nhật người dùng thành công!");
      navigate("/quanlykhachhang");
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    handleFileChange,
    preview,
    navigate
  };
};
