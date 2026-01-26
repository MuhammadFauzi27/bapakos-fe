// src/pages/user/detailKosModal.jsx
import { useEffect, useState } from "react";

const formatIDR = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export default function DetailKosModal({ item, onClose }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40" onMouseDown={onClose}>
      <div
        className="w-[860px] max-w-[92vw] rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header gambar */}
        <div className="p-5 md:p-6">
          <div className="flex gap-4">
            <img
              src={item.images[idx]}
              alt={item.title}
              className="h-56 w-full max-w-[540px] object-cover rounded-lg"
            />
            <div className="flex w-28 flex-col gap-3">
              {item.images.slice(0, 4).map((src, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`overflow-hidden rounded-md ring-1 ring-slate-200 ${idx === i ? "outline outline-2 outline-sky-500" : ""}`}
                >
                  <img src={src} alt={`thumb-${i}`} className="h-12 w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Judul + harga */}
          <div className="mt-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
            <div className="text-sm text-slate-700">{formatIDR(item.price)}</div>
          </div>
          <p className="mt-1 text-sm text-slate-700">{item.address}</p>
          <hr className="mt-3" />

          {/* Fasilitas */}
          <div className="mt-4">
            <h3 className="font-medium text-slate-900">Fasilitas</h3>
            <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
              {item.facilities?.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Deskripsi */}
          <div className="mt-4">
            <h3 className="font-medium text-slate-900">Deskripsi</h3>
            <p className="mt-1 text-sm text-slate-700 whitespace-pre-line">{item.description}</p>
          </div>

          <button className="mt-5 w-full rounded-lg bg-sky-600 py-2 text-white hover:bg-sky-700">
            Order Sekarang
          </button>

          <div className="mt-4">
            <img src={item.mapImage} alt="map" className="h-44 w-full rounded-lg object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
