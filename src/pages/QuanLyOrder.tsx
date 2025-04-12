import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import { AdminOrder } from "../hooks/AdminOrder.ts";
import { useState, useEffect } from 'react';

export const QuanLyOrder = () => {
  const { order, loading, error, searchTerm, statusFilter, filteredOrders, setSearchTerm, setStatusFilter, handleUpdateStatus, editingId, newStatus, setNewStatus, setEditingId } = AdminOrder();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  console.log(order)
  const [userRole, setUserRole] = useState<string>('');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserRole(parsedUser.role);
    }
  }, []);

  if (loading) return <p>Đang tải Đơn Hàng...</p>;
  if (error) return <p>{error}</p>;

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-auto p-6 bg-gradient-to-br shadow-xl overflow-hidden shadow-gray-500/50 from-cyan-500 to-purple-200 min-h-screen">
      <h2 className="text-4xl text-gray-900 ml-4 font-extrabold mb-6">Quản Lý Đơn Hàng</h2>
      <div className="bg-white p-6 shadow-xl border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Tìm kiếm đơn hàng..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          <div className="flex items-center space-x-4">
            <select
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ xử lý</option>
              <option value="processing">Đang xử lý</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>

        <table className="w-full border-collapse rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="p-4 text-left">Mã ĐH</th>
              <th className="p-4 text-left">Sản phẩm</th>
              <th className="p-4 text-left">Khách hàng</th>
              <th className="p-4 text-left">Ngày đặt</th>
              <th className="p-4 text-left">Tổng tiền</th>
              <th className="p-4 text-left">Trạng thái</th>
              <th className="p-4 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map((item) => (
              <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4">#{item._id}</td>
                <td className="p-4 flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
                  {item.name}
                </td>
                <td className="p-4">{item.customerName}</td>
                <td className="p-4">{item.orderDate}</td>
                <td className="p-4 font-medium">{item.totalPrice.toLocaleString('vi-VN')} ₫</td>
                 <td className="p-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    item.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    item.status === 'completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.status === 'pending' ? 'Chờ xử lý' :
                    item.status === 'processing' ? 'Đang xử lý' :
                    item.status === 'completed' ? 'Hoàn thành' : 'Đã hủy'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    {editingId === item._id ? (
                      <div className="flex items-center gap-2">
                        <select
                          value={newStatus}
                          onChange={(e) => setNewStatus(e.target.value)}
                          className="border px-2 py-1 rounded"
                        >
                          <option value="pending">Chờ xử lý</option>
                          <option value="processing">Đang xử lý</option>
                          <option value="completed">Hoàn thành</option>
                          <option value="cancelled">Đã hủy</option>
                        </select>
                        <button
                          onClick={() => handleUpdateStatus(item._id)}
                          className="bg-green-500 hover:bg-green-600 px-2 py-1 rounded text-white"
                        >
                          Lưu
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded"
                        >
                          Hủy
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 w-8 h-8 rounded-md text-white flex items-center justify-center"
                          onClick={() => {
                            setEditingId(item._id);
                            setNewStatus(item.status); // Gán trạng thái hiện tại
                          }}
                        >
                          <FaEdit className="w-3.5 h-3.5" />
                        </button>
                        {userRole === "admin" && (
                          <button
                            // onClick={() => handleDeleteOrder(item._id)} // Hàm xóa đơn hàng cần được định nghĩa
                             className="bg-red-500 hover:bg-red-600 w-8 h-8 rounded-md text-white flex items-center justify-center"
                          >
                            <FaTrash className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-600">
            Hiển thị {startIndex + 1} đến {Math.min(startIndex + itemsPerPage, filteredOrders.length)} của {filteredOrders.length} đơn hàng
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
              className="px-4 py-2 border rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              Trước
            </button>
            <button className="px-4 py-2 border rounded-lg bg-blue-500 text-white">
              {currentPage}
            </button>
            <button
              onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
              className="px-4 py-2 border rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
