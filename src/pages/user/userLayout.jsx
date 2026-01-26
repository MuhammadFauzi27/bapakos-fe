import { useState, useEffect } from "react";
import Navbar from "./navbar.jsx";
import FilterSidebar from "../../components/userSidebar.jsx";
import ListingCard from "../../components/kosCard.jsx";
import DetailKosModal from "./detailKosModal.jsx";
import { useTenantGetKosts } from "../../services/hooks/useTenant.jsx";

export default function UserLayout() {
  const [selected, setSelected] = useState(null);
  const [kosList, setKosList] = useState([]);
  const { getKosts, loading, error } = useTenantGetKosts();

  // Fetch data saat component mount
  useEffect(() => {
    const fetchKosts = async () => {
      try {
        const response = await getKosts();
        // Sesuaikan dengan struktur response dari backend
        // Misalnya response.data atau response.results
        setKosList(response.data || response || []);
      } catch (err) {
        console.error("Error fetching kosts:", err);
      }
    };

    fetchKosts();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar kiri */}
      <FilterSidebar />

      {/* Right panel: Navbar + Main */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Loading state */}
            {loading && (
              <div className="text-center py-10">
                <p className="text-gray-600">Memuat data kost...</p>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="text-center py-10">
                <p className="text-red-600">Error: {error}</p>
              </div>
            )}

            {/* Data list */}
            {!loading && !error && kosList.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-600">Tidak ada data kost tersedia</p>
              </div>
            )}

            {!loading && !error && kosList.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {kosList.map((item) => (
                  <ListingCard
                    key={item.id}
                    item={item}
                    onClick={() => setSelected(item)}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {selected && (
        <DetailKosModal item={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}