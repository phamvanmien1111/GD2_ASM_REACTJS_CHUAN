import { useState, useEffect } from "react";
import {AdminOrderStore} from "../store/AdminOrder"
import {getOrder ,updateOrderStatus} from "../services/orderService"
export const AdminOrder = ()=>{
  const { order, setOrder } = AdminOrderStore();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>("pending");
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
      const filteredOrders = order.filter((item) => {
      const matchesSearch = 
      item._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  const handleUpdateStatus = async (id: string) => {
    try {
      const data1 = await updateOrderStatus(id, newStatus);
       const updatedOrders = order.map((item) =>
        item._id === id ? { ...item, status: newStatus } : item
      );
      setOrder(updatedOrders);
      console.log(data1)
      alert("Cập nhật thành công!");
      setEditingId(null);
    } catch (error) {
      console.log(error)
    }
  };
      const [userRole, setUserRole] = useState<string>('');

        useEffect(() => {
          const user = localStorage.getItem('user');
          if (user) {
            const parsedUser = JSON.parse(user);
            setUserRole(parsedUser.role);
          }
        }, []);
      return { order, loading, error ,searchTerm ,statusFilter ,filteredOrders ,setSearchTerm ,setStatusFilter ,handleUpdateStatus ,editingId,newStatus,
        setNewStatus,setEditingId,userRole ,setUserRole
      };
    };
