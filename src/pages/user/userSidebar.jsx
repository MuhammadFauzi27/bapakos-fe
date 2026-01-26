// src/pages/user/userSidebar.jsx
import { Search, RefreshCcw, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserSidebar() {
  return (
    <aside className="w-72 min-h-screen bg-white border-r flex flex-col">
      {/* Logo */}
      <div className="flex flex-col items-center py-6 border-b">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-amber-400 text-2xl mb-2">👨🏻‍🦱</div>
        <h1 className="text-xl font-bold text-slate-800">BapaKos</h1>
      </div>

      {/* Search & Filters */}
      <div className="p-4 space-y-4">
        <div className="relative">
          <input
            placeholder="Cari Nama Kos..."
            className="w-full rounded-lg border px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button className="absolute right-1 top-1.5 rounded-md bg-sky-600 p-2 text-white hover:bg-sky-700" title="Cari">
            <Search className="h-4 w-4" />
          </button>
        </div>

        <h3 className="text-sm font-semibold text-slate-700">Filter Pencarian</h3>

        <div className="space-y-3">
          <div>
            <label className="text-xs text-slate-600 mb-1 block">Lokasi</label>
            <select className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500">
              <option>Pilih Provinsi</option>
            </select>
          </div>

          <select className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500" disabled>
            <option>Pilih Kota/Kabupaten</option>
          </select>

          <div>
            <label className="text-xs text-slate-600 mb-1 block">Rentang Harga</label>
            <div className="grid grid-cols-2 gap-2">
              <input className="w-full rounded-lg border px-3 py-2 text-sm outline-none" placeholder="Min" />
              <input className="w-full rounded-lg border px-3 py-2 text-sm outline-none" placeholder="Max" />
            </div>
          </div>

          <button className="w-full rounded-lg bg-sky-600 py-2 text-sm font-medium text-white hover:bg-sky-700">Cari</button>
          <button className="w-full rounded-lg border py-2 text-sm font-medium hover:bg-slate-50">
            <span className="inline-flex items-center gap-2 justify-center">
              <RefreshCcw className="h-4 w-4" /> Refresh
            </span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-4 border-t">
        <Link
          to="/"
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-rose-50 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100"
        >
          <LogOut className="h-4 w-4" /> Logout
        </Link>
      </div>
    </aside>
  );
}
