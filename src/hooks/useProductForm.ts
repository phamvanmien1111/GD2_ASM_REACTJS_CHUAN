import { useState, useEffect } from "react";
import { getProductById  } from "../services/productService";
import { Product } from "../types/Product";

export const useProductForm = (id?: string) => {
  const [product, setProduct] = useState<Product>({
  name: "",
  price: 0,
  category: "",
  status: "",
  image: new File([], "placeholder.jpg"), 
  description: "",
  stock: 0,
});
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    if (id) {
      getProductById(id).then((data) => {
        setProduct({
          ...data,
          price: Number(data.price),
          stock: Number(data.stock), 
          image: null,
        });

        if (data.image) {
          setPreview(`http://localhost:5000/images/${data.image}`);
        }
      });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value, 
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setProduct((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file)); 
    }
  };
 

  return { product, preview, handleChange, handleFileChange, setProduct };
};
    