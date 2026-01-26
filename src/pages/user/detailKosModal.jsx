// src/pages/user/detailKosModal.jsx
import { useEffect } from "react";
import { baseUrlImg } from "../../services/apiJson.js";
import { useBookingKost } from "../../services/hooks/useBooking.jsx";

const formatIDR = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export default function DetailKosModal({ item, onClose }) {
  const { submitBooking, loading, error } = useBookingKost();

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSewa = async () => {
    try {
      const payload = {
        id: item.id,
        landlordId: item.landlordId,
        name: item.name,
        price: item.price,
        description: item.description,
        location: item.location,
        facilities: item.facilities,
        images: item.images,
      };

      const response = await submitBooking(payload);

      // Jika berhasil, tampilkan notifikasi atau redirect
      alert("Booking berhasil!");
      onClose(); // Tutup modal

      // Atau jika Anda ingin redirect:
      // window.location.href = "/booking-success";

    } catch (err) {
      console.error("Error saat booking:", err);
      // Error sudah di-handle oleh hook, tapi bisa tambahkan notifikasi di sini
      alert(`Gagal melakukan booking: ${err.message}`);
    }
  };

  if (!item) return null;

  // Ambil gambar pertama dari array images
  const imageUrl = item.images?.[0]?.image_url || "";
  // Parse location (format: "Provinsi.Kota.Kode Pos.Alamat")
  const locationParts = item.location?.split('.') || [];
  const fullAddress = locationParts.length > 0 ? locationParts.slice(3).join('.') : item.location;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40" onMouseDown={onClose}>
      <div
        className="w-[860px] max-w-[92vw] rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header gambar */}
        <div className="p-5 md:p-6">
          <div className="w-full">
            <img
              src={`${baseUrlImg}/${imageUrl}`}
              alt={item.name}
              className="h-56 w-full object-cover rounded-lg"
            />
          </div>

          {/* Judul + harga */}
          <div className="mt-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">{item.name}</h2>
            <div className="text-sm text-slate-700">{formatIDR(item.price)}</div>
          </div>
          <p className="mt-1 text-sm text-slate-700">{fullAddress}</p>
          <hr className="mt-3" />

          {/* Deskripsi */}
          <div className="mt-4">
            <h3 className="font-medium text-slate-900">Deskripsi</h3>
            <p className="mt-1 text-sm text-slate-700 whitespace-pre-line">{item.description}</p>
          </div>

          {/* Tampilkan error jika ada */}
          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <button
            onClick={handleSewa}
            disabled={loading}
            className="mt-5 w-full rounded-lg bg-sky-600 py-2 text-white hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Memproses..." : "Sewa Sekarang"}
          </button>
        </div>
      </div>
    </div>
  );
}