import { useState } from "react";
import { 
  FaTable, FaUser, FaShoppingCart, FaChevronDown, FaChevronRight, 
  FaBox, FaClipboardList, FaUsers, FaChartBar 
} from "react-icons/fa";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const handleItemClick = (item: string) => {
    setActiveItem(item);
  };

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-gray-900 pt-10 text-white flex flex-col p-4 shadow-lg shadow-gray-900/20 overflow-y-auto">
      <div className="flex items-center w-full">
        <Link to="/" className="flex items-center">
          <img src="/images/logo.jpg" className="w-16 h-16 mx-auto rounded-full shadow-lg mr-2" alt="Logo" />
          <h2 className="text-xl font-serif">SHOP MIEN</h2>
        </Link>
      </div>
      <nav className="flex flex-col mt-8 gap-3">
        <Link
          to="/"
          className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 
            ${activeItem === "dashboard" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => handleItemClick("dashboard")}
        >
          <FaTable /> Dashboard
        </Link>

        <div className="relative">
          <button
            onClick={() => {
              setIsTableOpen(!isTableOpen);
              handleItemClick("quanly");
            }}
            className={`flex items-center justify-between w-full p-2 rounded-lg transition-all duration-200 
              ${activeItem === "quanly" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          >
            <span className="flex items-center gap-2">
              <FaBox />
              <span>Quản Lý</span>
            </span>
            {isTableOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>

          {isTableOpen && (
            <div className="ml-6 flex flex-col gap-2 mt-2">
              <Link
                to="/quanlysanpham"
                className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 
                  ${activeItem === "sanpham" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                onClick={() => handleItemClick("sanpham")}
              >
                <FaBox /> Quản Lý Sản Phẩm
              </Link>
              <Link
                to="quanlyorder"
                className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 
                  ${activeItem === "donhang" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                onClick={() => handleItemClick("donhang")}
              >
                <FaClipboardList /> Quản lý đơn hàng
              </Link>
              <a
                href="#"
                className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 
                  ${activeItem === "khachhang" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                onClick={() => handleItemClick("khachhang")}
              >
                <FaUsers /> Quản lý khách hàng
              </a>
              <a
                href="#"
                className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 
                  ${activeItem === "thongke" ? "bg-gray-700" : "hover:bg-gray-700"}`}
                onClick={() => handleItemClick("thongke")}
              >
                <FaChartBar /> Thống kê
              </a>
            </div>
          )}
        </div>

        <a
          href="#"
          className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 
            ${activeItem === "profile" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => handleItemClick("profile")}
        >
          <FaUser /> Profile
        </a>

        <a
          href="#"
          className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 
            ${activeItem === "billing" ? "bg-gray-700" : "hover:bg-gray-700"}`}
          onClick={() => handleItemClick("billing")}
        >
          <FaShoppingCart /> Billing
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;