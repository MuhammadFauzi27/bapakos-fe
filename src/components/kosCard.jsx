// src/pages/user/kosCard.jsx
import {baseUrlImg} from "../services/apiJson.js";
import {splitAndKeepRest} from "../pages/admin/editKamar.jsx";

const formatIDR = (n) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export default function ListingCard({ item, onClick }) {

  const address = splitAndKeepRest(item.location, ".", 4);

  const kostAdress = `${address[0]}, ${address[1]}`;
  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden rounded-xl ring-1 ring-slate-200 bg-white text-left hover:shadow-md transition-shadow"
    >
      <img
        src={`${baseUrlImg}/${item.images?.[0]?.image_url}`}
        alt={item.title}
        className="h-56 w-full object-cover"
      />
      <div className="absolute inset-x-4 bottom-4">
        <div className="rounded-xl bg-white/90 backdrop-blur px-4 py-3 shadow-sm">
          <div className="text-lg font-semibold text-slate-900">{item.name}</div>
          <div className="mt-1 text-sm text-slate-600">{kostAdress}</div>
          <div className="mt-2 font-bold text-slate-900">
            {formatIDR(item.price)} <span className="text-sm font-normal text-slate-500">/perbulan</span>
          </div>
        </div>
      </div>
    </button>
  );
}
