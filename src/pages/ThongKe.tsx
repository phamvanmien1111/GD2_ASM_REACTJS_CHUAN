import { Doughnut, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useStatistics } from "../hooks/useStatistics";

const RevenueStats = () => {
  const { stats, loading } = useStatistics();

  if (loading) return <div className="text-center text-gray-600">Đang tải...</div>;
  if (!stats || !stats.hasData) return <div className="text-center text-gray-500">Chưa có dữ liệu.</div>;

  const pieData = {
    labels: stats.topSellingProducts.map((p) => p._id),
    datasets: [
      {
        data: stats.topSellingProducts.map((p) => p.totalQuantitySold),
        backgroundColor: ["#4966F3", "#4F46E5", "#818CF8", "#A78BFA", "#D946EF", "#EC4899"],
      },
    ],
  };

  const barData = {
    labels: stats.topSellingProducts.map((p) => p._id),
    datasets: [
      {
        label: "Số lượng bán",
        data: stats.topSellingProducts.map((p) => p.totalQuantitySold),
        backgroundColor: "#6366F1",
      },
    ],
  };
  return (
    <div className="w-auto p-6 bg-gradient-to-br shadow-xl overflow-hidden from-cyan-500  to-purple-200 min-h-screen ">
      <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">Thống Kê Doanh Thu</h1>

      {/* Tổng doanh thu */}
      <div className="bg-indigo-500 text-white p-6 rounded-xl shadow-lg mb-6 text-center">
        <h2 className="text-xl font-semibold">Tổng Doanh Thu</h2>
        <p className="text-3xl font-bold">{stats.revenue.toLocaleString()} VND</p>
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-center mb-4">Tỷ Lệ Bán Hàng</h3>
          <Doughnut data={pieData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-center mb-4">Số Lượng Bán</h3>
          <Bar data={barData} />
        </div>
      </div>

      {/* Bảng chi tiết sản phẩm */}
      <div className="bg-white mt-6 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Chi Tiết Sản Phẩm</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản Phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số Lượng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doanh Thu
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.topSellingProducts.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.totalQuantitySold}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                    {product.totalRevenue.toLocaleString()} VND
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenueStats;
