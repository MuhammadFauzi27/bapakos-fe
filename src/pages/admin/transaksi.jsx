import React from "react";

export const Transaksi = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">
          Riwayat Transaksi
        </h1>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Cari Transaksi..."
            className="border rounded-lg px-4 py-2 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow p-4">
        <table className="w-full h-auto text-sm">
          
          {/* Table Head */}
          <thead className="border-b text-gray-600">
            <tr>
              <th className="py-3 text-left">No</th>
              <th className="text-left">Nama Kos</th>
              <th className="text-left">Penyewa</th>
              <th className="text-left">Aksi</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            <tr>
              <td
                colSpan="5"
                className="py-12 text-center text-gray-400"
              >
                Belum ada data transaksi
              </td>
            </tr>
          </tbody>

        </table>
      </div>

    </div>
  );
};