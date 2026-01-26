import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../pages/auth/login.jsx";
import {Register} from "../pages/auth/register.jsx";

import { AdminLayout } from "../components/adminLayout.jsx";
import { Dashboard } from "../pages/admin/dashboard.jsx";
import { Transaksi } from "../pages/admin/transaksi.jsx";
import { Order } from "../pages/admin/order.jsx";
import { Report } from "../pages/admin/report.jsx";
import { TambahKos } from "../pages/admin/kamar.jsx";
import { UpdateKos } from "../pages/admin/editKamar.jsx";

import UserLayout from "../pages/user/userLayout.jsx";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* AUTH */}
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout/>}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="kamar" element={<TambahKos/>} />
          <Route path="transaksi" element={<Transaksi/>} />
          <Route path="order" element={<Order/>} />
          <Route path="report" element={<Report/>} />
          <Route path="kamar/edit/:id" element={<UpdateKos />} />
        </Route>
        {/* USER */}
        <Route path="/user" element={<UserLayout/>} />
      </Routes>
    </BrowserRouter>
  )
}