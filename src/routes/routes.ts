import { RouteObject } from "react-router-dom";
import React from "react";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import QuanLySanPham from "../pages/QuanLySanPham";
import { quanlyorder } from "../pages/QuanLyOrder"
import EditProduct from '../pages/EditProduct'
const routes: RouteObject[] = [
  {
    path: "/",
    element: React.createElement(AdminLayout),
    children: [
      { index: true, element: React.createElement(Dashboard) },
      { path: "quanlysanpham", element: React.createElement(QuanLySanPham) },
      { path: "quanlyorder", element: React.createElement(quanlyorder) },
      { path: "edit/:id", element: React.createElement(EditProduct) },
    ],
  },
];

export default routes;
