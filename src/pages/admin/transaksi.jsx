import React, { useEffect, useState } from "react";
import { useLandlordGetTransaction, useLandlordUpdateTransaction } from "../../services/hooks/useBooking.jsx";

export const Transaksi = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const { getTransaction, loading, error } = useLandlordGetTransaction();
  const { getTransaction: updateTransaction, loading: updateLoading } = useLandlordUpdateTransaction();

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

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredTransactions(transactions);
      return;
    }

    const filtered = transactions.filter((transaction) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        transaction.kost_name.toLowerCase().includes(searchLower) ||
        transaction.kost_location.toLowerCase().includes(searchLower)
      );
    });
    setFilteredTransactions(filtered);
  };

  // Handle approve/reject
  const handleUpdateStatus = async (bookingId, status) => {
    try {
      await updateTransaction({ bookingId, status });
      // Refresh data setelah update
      await fetchTransactions();
      alert(`Transaksi berhasil ${status === 'APPROVED' ? 'disetujui' : 'ditolak'}`);
    } catch (err) {
      console.error("Error updating transaction:", err);
      alert(`Gagal mengubah status transaksi`);
    }
  };

  // Format harga
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="border rounded-lg px-4 py-2 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            {/* Table Head */}
            <thead className="border-b bg-gray-50 text-gray-600">
            <tr>
              <th className="py-3 px-4 text-left font-medium">No</th>
              <th className="py-3 px-4 text-left font-medium">Nama Kos</th>
              <th className="py-3 px-4 text-left font-medium">Lokasi</th>
              <th className="py-3 px-4 text-left font-medium">Harga</th>
              <th className="py-3 px-4 text-left font-medium">Status</th>
              <th className="py-3 px-4 text-center font-medium">Aksi</th>
            </tr>
            </thead>

            {/* Table Body */}
            <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-gray-400">
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                </td>
              </tr>
            ) : filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-gray-400">
                  Belum ada data transaksi
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
                  <td className="py-4 px-4 text-gray-800 font-medium">
                    {formatPrice(transaction.kost_price)}
                  </td>
                  <td className="py-4 px-4">
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center gap-2">
                      {transaction.status === 'PENDING' ? (
                        <>
                          <button
                            onClick={() => handleUpdateStatus(transaction.id, 'APPROVED')}
                            disabled={updateLoading}
                            className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(transaction.id, 'REJECTED')}
                            disabled={updateLoading}
                            className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-gray-400 text-xs">Tidak ada aksi</span>
                      )}
                    </div>
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