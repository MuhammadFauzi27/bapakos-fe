import React, {useEffect, useState} from "react";
import {useLandlordGetKostsById, useLandlordDeleteKostById} from "../../services/hooks/useLandlord.jsx";
import {useNavigate} from "react-router-dom";

export function Dashboard() {
  const [kosts, setKosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { getKostsById, loading, error } = useLandlordGetKostsById();
  const { deleteKostById, loading: deleteLoading } = useLandlordDeleteKostById();
  const navigate = useNavigate();

  useEffect(() => {
    fetchKosts();
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/kamar/edit/${id}`);
  };

  const handleDelete = async (id) => {
    // Konfirmasi sebelum menghapus
    if (window.confirm("Apakah Anda yakin ingin menghapus kos ini?")) {
      try {
        await deleteKostById({ id });

        // Refresh data setelah berhasil menghapus
        await fetchKosts();

        // Optional: Tampilkan notifikasi sukses
        alert("Kos berhasil dihapus!");
      } catch (err) {
        console.error("Error deleting kost:", err);
        alert("Gagal menghapus kos. Silakan coba lagi.");
      }
    }
  };

  const fetchKosts = async () => {
    try {
      const response = await getKostsById();
      console.log("Fetching Kosts: ", response);
      setKosts(response.data || []);
    } catch (err) {
      console.error("Error fetching kosts:", err);
    }
  };

  const filteredKosts = kosts.filter((kost) =>
    kost.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kost.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleCreateKost = () => {
    navigate("/admin/kamar");
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

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
          <h2 className="text-2xl font-bold mt-2">{kosts.length}</h2>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCreateKost}
              className="flex items-center bg-blue-600 text-white gap-1 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-[19px] h-[19px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
              Buat
            </button>
          </div>
        </div>

        {/* Table Container dengan Max Height dan Scroll */}
        <div className="overflow-x-auto">
          <div className="max-h-96 overflow-y-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0 z-10">
              <tr className="border-b text-gray-500">
                <th className="text-left py-3 px-4">No</th>
                <th className="text-left py-3 px-4 min-w-[200px]">Nama</th>
                <th className="text-left py-3 px-4 min-w-[300px]">Alamat</th>
                <th className="text-left py-3 px-4">Harga</th>
                <th className="text-left py-3 px-4">Aksi</th>
              </tr>
              </thead>
              <tbody className="bg-white">
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Memuat data...
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-red-500">
                    Error: {error}
                  </td>
                </tr>
              ) : filteredKosts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    {searchTerm ? "Tidak ada data yang sesuai dengan pencarian." : "Belum ada data kos yang ditambahkan."}
                  </td>
                </tr>
              ) : (
                filteredKosts.map((kost, index) => (
                  <tr key={kost.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 font-medium">{kost.name}</td>
                    <td className="py-3 px-4 text-gray-600">{kost.location}</td>
                    <td className="py-3 px-4 font-semibold text-green-600">
                      {formatCurrency(kost.price)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          className="text-yellow-600 hover:text-yellow-800 transition-colors"
                          title="Edit"
                          onClick={() => handleEdit(kost.id)}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Hapus"
                          onClick={() => handleDelete(kost.id)}
                          disabled={deleteLoading}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
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
    </div>
  );
}