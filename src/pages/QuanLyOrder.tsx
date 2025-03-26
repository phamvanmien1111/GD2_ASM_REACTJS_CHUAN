import { AdminOrder } from "../hooks/AdminOrder.ts";
import { FaEdit, FaTrash } from "react-icons/fa";
export const quanlyorder = () => {
  const { order, loading, error } = AdminOrder();

  if (loading) return <p>Đang tải Đơn Hàng...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-[84%] p-6 bg-gradient-to-br shadow-xl overflow-hidden shadow-gray-500/50 from-cyan-500 to-cyan-200 min-h-screen ml-64">
      <h2 className="text-4xl text-gray-900 ml-4 font-extrabold mb-6">Danh Sách Đơn Hàng</h2>

      <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-200">
        <h3 className="text-lg text-gray-900 font-semibold mb-4">Chi tiết đơn hàng</h3>

        <table className="w-full border-collapse rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="p-4 text-left">Sản phẩm</th>
              <th className="p-4 text-left">Giá</th>
              <th className="p-4 text-left">Số lượng</th>
              <th className="p-4 text-left">Tổng tiền</th>
              <th className="p-4 text-left">Hành Động</th>

            </tr>
          </thead>
          <tbody>
            {order.map((item) => (
              <tr className="border-b border-gray-100 hover:bg-gray-200 text-gray-900">
                <td className="p-3 flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg" />
                  {item.name}
                    </td>
                        <td className="p-3">{item.price.toLocaleString()} VNĐ</td>
                        <td className="p-3">{item.quantity}</td>
                    <td className="p-3 font-semibold text-blue-500">
                  {(item.price * item.quantity).toLocaleString()} VNĐ
                </td>
            <td className="p-3">
                <div className="flex items-center gap-2">
                <button className="bg-blue-500 hover:bg-blue-600 w-8 h-8 rounded-md text-white flex items-center justify-center">
                    <FaEdit className="w-3.5 h-3.5" />
                </button>
                <button className="bg-red-500 hover:bg-red-600 w-8 h-8 rounded-md text-white flex items-center justify-center">
                    <FaTrash className="w-3.5 h-3.5" />
                </button>
                </div>
            </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
