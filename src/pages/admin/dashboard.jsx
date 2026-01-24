import React from "react";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      
      {/* Header */}
      <h1 className="text-2xl font-bold text-slate-800">
        Selamat Datang, Admin!
      </h1>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold mt-2">Rp 0,00</h2>
          <p className="text-sm text-gray-400 mt-1">
            0% dari bulan lalu
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Jumlah Kos Dimiliki</p>
          <h2 className="text-2xl font-bold mt-2">0</h2>
          <p className="text-sm text-gray-400 mt-1">
            0 kos baru
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm text-gray-500">Jumlah Transaksi</p>
          <h2 className="text-2xl font-bold mt-2">0</h2>
          <p className="text-sm text-gray-400 mt-1">
            0 transaksi berhasil
          </p>
        </div>

      </div>

      {/* Section Tabel */}
      <div className="bg-white rounded-xl shadow p-6">

        {/* Header tabel */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold">
            Semua Kost Yang Dimiliki
          </h2>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Cari Kos..."
              className="border rounded-lg px-3 py-2 text-sm"
            />
            <Link to="/admin/kamar" className="flex items-center bg-blue-600 text-white gap-1 px-4 py-2 rounded-lg hover:bg-blue-700">
              <svg class="w-[19px] h-[19px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              Buat
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="text-left py-3">No</th>
                <th className="text-left py-3">Nama</th>
                <th className="text-left py-3">Alamat</th>
                <th className="text-left py-3">Harga</th>
                <th className="text-left py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  Belum ada data kos yang ditambahkan.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
