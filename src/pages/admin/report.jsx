import React, { useEffect, useState } from "react";
import { useLandlordGetTransaction } from "../../services/hooks/useBooking.jsx";

export const Report = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filterDate, setFilterDate] = useState("");

  const { getTransaction, loading, error } = useLandlordGetTransaction();

  // Fetch data saat component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await getTransaction();
      if (response?.data) {
        setTransactions(response.data);
        setFilteredTransactions(response.data);
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  // Filter berdasarkan tanggal
  const handleFilter = () => {
    if (!filterDate) {
      setFilteredTransactions(transactions);
      return;
    }

    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.created_at).toISOString().split('T')[0];
      return transactionDate === filterDate;
    });
    setFilteredTransactions(filtered);
  };

  // Reset filter
  const handleResetFilter = () => {
    setFilterDate("");
    setFilteredTransactions(transactions);
  };

  // Hitung summary
  const getSummary = () => {
    const approvedTransactions = filteredTransactions.filter(t => t.status === 'APPROVED');

    return {
      totalTransaksi: filteredTransactions.length,
      totalPendapatan: approvedTransactions.reduce((sum, t) => sum + t.kost_price, 0),
      kosAktif: new Set(approvedTransactions.map(t => t.kost_id)).size
    };
  };

  const summary = getSummary();

  // Format harga
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Format tanggal
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Menunggu' },
      APPROVED: { bg: 'bg-green-100', text: 'text-green-800', label: 'Disetujui' },
      REJECTED: { bg: 'bg-red-100', text: 'text-red-800', label: 'Ditolak' },
      CANCELLED: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Dibatalkan' },
      COMPLETED: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Selesai' }
    };

    const config = statusConfig[status] || statusConfig.PENDING;

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

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
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Filter
          </button>
          {filterDate && (
            <button
              onClick={handleResetFilter}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Transaksi</p>
          <h2 className="text-2xl font-bold text-slate-800">
            {loading ? "..." : summary.totalTransaksi}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Pendapatan</p>
          <h2 className="text-2xl font-bold text-slate-800">
            {loading ? "..." : formatPrice(summary.totalPendapatan)}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Kos Aktif</p>
          <h2 className="text-2xl font-bold text-slate-800">
            {loading ? "..." : summary.kosAktif}
          </h2>
        </div>
      </div>

      {/* Report Table */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Detail Laporan
          </h2>
          {filterDate && (
            <span className="text-sm text-gray-500">
              Tanggal: {formatDate(filterDate)}
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50 text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left font-medium">No</th>
              <th className="py-3 px-4 text-left font-medium">Nama Kos</th>
              <th className="py-3 px-4 text-left font-medium">Lokasi</th>
              <th className="py-3 px-4 text-left font-medium">Tanggal</th>
              <th className="py-3 px-4 text-left font-medium">Total</th>
              <th className="py-3 px-4 text-left font-medium">Status</th>
            </tr>
            </thead>

            <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-10 text-center text-gray-400">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                </td>
              </tr>
            ) : filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-10 text-center text-gray-400">
                  {filterDate ? "Tidak ada data untuk tanggal yang dipilih" : "Belum ada data laporan"}
                </td>
              </tr>
            ) : (
              filteredTransactions.map((transaction, index) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-4 px-4">{index + 1}</td>
                  <td className="py-4 px-4 font-medium text-gray-800">
                    {transaction.kost_name}
                  </td>
                  <td className="py-4 px-4 text-gray-600 max-w-xs truncate" title={transaction.kost_location}>
                    {transaction.kost_location}
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {formatDate(transaction.created_at)}
                  </td>
                  <td className="py-4 px-4 text-gray-800 font-medium">
                    {formatPrice(transaction.kost_price)}
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={transaction.status} />
                  </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};