// src/pages/user/userLayout.jsx
import { useState } from "react";
import Navbar from "../pages/user/navbar.jsx";
import FilterSidebar from "./userSidebar.jsx";
import ListingCard from "./kosCard.jsx";
import DetailKosModal from "../pages/user/detailKosModal.jsx";
import { KOS_LIST } from "../pages/user/kosData.js";

export default function UserLayout() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar kiri */}
      <FilterSidebar />

      {/* Right panel: Navbar + Main */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {KOS_LIST.map((item) => (
                <ListingCard key={item.id} item={item} onClick={() => setSelected(item)} />
              ))}
            </div>
          </div>
        </main>
      </div>

      {selected && (
        <DetailKosModal item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
