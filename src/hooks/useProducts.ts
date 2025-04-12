import { useState, useEffect } from "react";
import { getProducts,deleteProduct, createProduct as apiCreateProduct } from "../services/productService";
import { useProductStore } from "../store/AdminProductStore";
import {Product} from "../types/Product";
export const useProducts = () => {
  const { products, setProducts } = useProductStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: Product[] = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
        setError("Lỗi khi tải dữ liệu!");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts]);

 const createProduct = async (newProduct: { name: string; price: number; category: string; status: string; image: File  ; description: string;
  stock: number;})=>{

  try {
    const data: Product = await apiCreateProduct(newProduct);
    setProducts([...products, data]);
  } catch (err) {
    setError((err as Error).message);
  }
};
const handleDelete = async (id: string) => { 
  try {
    await deleteProduct(id); 
    setProducts(products.filter((product) => product._id !== id)); 
    alert("Xóa sản phẩm thành công!");
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
  }
};
    
  return { products, loading, error, createProduct ,handleDelete };
};