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
      <nav className="px-4 py-4 space-y-2">
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

    </aside>
  );
};
