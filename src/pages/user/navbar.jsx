// src/pages/user/navbar.jsx
import { Bell, Home, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-slate-800">BapaKos - Cari Kos Impianmu</h1>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 rounded-lg" title="Bookmark">
          <Bookmark className="h-5 w-5 text-slate-600" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-lg" title="Notifikasi">
          <Bell className="h-5 w-5 text-slate-600" />
        </button>
        <Link to="/" className="p-2 hover:bg-slate-100 rounded-lg" title="Home">
          <Home className="h-5 w-5 text-slate-600" />
        </Link>
        
        <div className="flex items-center gap-2 ml-2">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-amber-400 text-sm">👨🏻‍🦱</div>
          <span className="text-sm font-medium text-slate-700">User</span>
        </div>
      </div>
    </header>
  );
}
