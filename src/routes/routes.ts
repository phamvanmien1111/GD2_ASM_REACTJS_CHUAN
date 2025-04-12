import { RouteObject } from "react-router-dom";
import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import QuanLySanPham from "../pages/QuanLySanPham";
import { QuanLyOrder } from "../pages/QuanLyOrder"
import EditProduct from '../pages/EditProduct'
import UserTable from '../pages/QuanLyKhachHang'
import EditUser from'../pages/editUser'
import Login from '../pages/Login'
import RevenueStats from'../pages/ThongKe'
const routes: RouteObject[] = [
  { index :true ,element:React.createElement(Login)},
  { path:"login", element: React.createElement(Login) },

  {
    path: "/",element: React.createElement(AdminLayout),children: [
      // { : true, element: React.createElement(Login) },
      { path:"Dashbord", element: React.createElement(Dashboard) },
      { path: "quanlysanpham", element: React.createElement(QuanLySanPham) },
      { path: "quanlyorder", element: React.createElement(QuanLyOrder) },
      { path: "editproduct/:id", element: React.createElement(EditProduct) },
      { path: "quanlykhachhang", element:React.createElement(UserTable)},
      { path: "editUser/:id",element:React.createElement(EditUser)},
      { path: "thongke",element:React.createElement(RevenueStats)}
    ],
    
  },
];

export default routes;
