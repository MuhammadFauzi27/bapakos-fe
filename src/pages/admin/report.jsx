import React from "react";

export const Report = () => {
  return (
    <div className="space-y-6 pb-10">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">
          Laporan
        </h1>

        <div className="flex gap-2">
          <input
            type="date"
            className="border rounded-lg px-3 py-2 text-sm"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Filter
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Transaksi</p>
          <h2 className="text-2xl font-bold">0</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Pendapatan</p>
          <h2 className="text-2xl font-bold">Rp 0</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Kos Aktif</p>
          <h2 className="text-2xl font-bold">0</h2>
        </div>
      </div>

      {/* Report Table */}
      <div className="bg-white rounded-xl shadow p-4">

        <h2 className="text-lg font-semibold mb-4">
          Detail Laporan
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-gray-600">
              <tr>
                <th className="py-3 text-left">No</th>
                <th className="text-left">Nama Kos</th>
                <th className="text-left">Penyewa</th>
                <th className="text-left">Tanggal</th>
                <th className="text-left">Total</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td
                  colSpan="6"
                  className="py-10 text-center text-gray-400"
                >
                  Belum ada data laporan
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
