import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { FaBox, FaClipboardList, FaUsers, FaChartBar } from "react-icons/fa";
import { cn } from "../utils/utils";
export default function Dashboard1() {
    console.log(cn("rounded-xl border bg-card text-card-foreground shadow", ""));
  return (
    <div className="w-auto p-6 bg-gradient-to-br shadow-xl overflow-hidden shadow-gray-500/50 from-cyan-500 to-cyan-200 min-h-screen">
        <h1 className="text-5xl text-gray-900 ml-4 font-extrabold mb-6">Dashboard</h1>
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaBox /> Quản lý sản phẩm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">4,42,236</p>
            <p className="text-sm text-blue-500">+59.3%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaClipboardList /> Quản lý đơn hàng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">78,250</p>
            <p className="text-sm text-green-500">+70.5%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaUsers /> Quản lý khách hàng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">18,800</p>
            <p className="text-sm text-orange-500">+27.4%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaChartBar /> Thống kê
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$35,078</p>
            <p className="text-sm text-red-500">-27.4%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-6">

       
      </div>
    </div>
  );
}
