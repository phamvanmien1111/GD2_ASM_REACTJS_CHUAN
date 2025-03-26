import { useState, useEffect } from "react";
import {AdminOrderStore} from "../store/AdminOrder"
import {getOrder} from "../services/orderService"
export const AdminOrder = ()=>{
    const { order, setOrder } = AdminOrderStore();
     const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
    
      useEffect(() => {
        const fetchProducts = async () => {
          try {
            const data1 = await getOrder();
            setOrder(data1);
          } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
            setError("Lỗi khi tải dữ liệu!");
          } finally {
            setLoading(false);
          }
        };
    
        fetchProducts();
      }, [setOrder]);
    
      return { order, loading, error };
    };