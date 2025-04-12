import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../services/productService";
import { Product } from "../types/Product";

export const useProductForm = (id?: string) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<Product>({
    defaultValues: {
      name: "",
      price: 0,
      category: "",
      status: "",
      description: "",
      stock: 0,
      image: undefined,
    },
  });

  useEffect(() => {
    if (id) {
      getProductById(id).then((data) => {
        Object.keys(data).forEach((key) => {
          setValue(key as keyof Product, data[key as keyof Product]);
        });

        if (data.image) {
          setPreview(`http://localhost:5000/images/${data.image}`);
        }
      });
    }
  }, [id, setValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: Product) => {
    try {
      await updateProduct(id!, data);
      alert("Cập nhật thành công!");
      navigate("/quanlysanpham");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    handleFileChange,
    preview,
  };
};
