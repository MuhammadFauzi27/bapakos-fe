import { Link } from "react-router-dom";
import { LayoutDashboard, FileText, ShoppingBag, TrendingUp } from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="w-64 min-h-screen bg-white flex flex-col">

      {/* Logo */}
      <div className="flex flex-col items-center py-6 border-b border-slate-700">
        <Link to="/admin/dashboard" className="flex flex-col items-center">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-amber-400 text-3xl mb-2">👨🏻‍🦱</div>
          <h1 className="text-xl font-bold">BapaKos</h1>
        </Link>
      </div>

      {/* Menu */}
      <nav className="px-4 py-4 space-y-2 flex-1">
        <Link to="/admin/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100">
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Link>
        <Link to="/admin/transaksi" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100">
          <FileText className="h-5 w-5" />
          Transaksi
        </Link>
        <Link to="/admin/order" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100">
          <ShoppingBag className="h-5 w-5" />
          Order
        </Link>
        <Link to="/admin/report" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100">
          <TrendingUp className="h-5 w-5" />
          Report
        </Link>
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-200">
        <div className="flex items-center gap-2 mb-3 text-sm text-slate-700">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <span className="font-medium">Admin BapaKos</span>
        </div>

        <Link
          to="/"
          className="w-full block text-center px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
        >
          Logout
        </Link>
      </div>
    </aside>
  );
};