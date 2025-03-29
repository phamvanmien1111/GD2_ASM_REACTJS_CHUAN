// import { useState, useEffect } from "react";
// import { getProducts ,  } from "../services/productService";
// import { useProductStore } from "../store/AdminProductStore";

// export const useProducts = () => {
//   const { products, setProducts } = useProductStore();
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const data = await getProducts();
//         setProducts(data);
//       } catch (error) {
//         console.error("Lỗi khi tải dữ liệu:", error);
//         setError("Lỗi khi tải dữ liệu!");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [setProducts]);

//   // 🛠 **Thêm hàm tạo sản phẩm**
//   const createProduct = async (newProduct) => {
//     try {
//       const res = await fetch("/api/products", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newProduct),
//       });
//       if (!res.ok) throw new Error("Không thể thêm sản phẩm");
//       const data = await res.json();
//       setProducts([...products, data]);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // 🛠 **Thêm hàm chỉnh sửa sản phẩm**
//   const editProduct = async (id, updatedProduct) => {
//     try {
//       const res = await fetch(`/api/products/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedProduct),
//       });
//       if (!res.ok) throw new Error("Không thể cập nhật sản phẩm");
//       const data = await res.json();
//       setProducts(products.map((p) => (p.id === id ? data : p)));
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return { products, loading, error, createProduct, editProduct };

// };
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
    setProducts(products.filter((product) => product._id !== id)); // Cập nhật state
    alert("Xóa sản phẩm thành công!");
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
  }
};
    
  return { products, loading, error, createProduct ,handleDelete };
};