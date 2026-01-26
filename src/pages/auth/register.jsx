import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../services/hooks/useAuth.jsx";
import { useState } from "react";

export const Register = () => {
  const navigate = useNavigate();
  const { submitRegister, loading, error } = useRegister();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "TENANT",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleSelect = (role) => {
    setForm({
      ...form,
      role: role,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await submitRegister(form);

      // Redirect ke login setelah berhasil register
      navigate("/");
    } catch (err) {
      // Error handling sudah dilakukan di hook
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Panel kiri - Gambar */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-500 to-green-600 items-center justify-center p-12">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">BapaKos</h1>
          <p className="text-xl opacity-90">Daftarkan diri Anda dan mulai mencari kos</p>
        </div>
      </div>

      {/* Panel kanan - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-400 text-3xl mb-4">👨🏻‍🦱</div>
            <h2 className="text-3xl font-bold text-slate-800">Buat Akun Baru</h2>
            <p className="text-slate-600 mt-2">Bergabung dengan BapaKos sekarang</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Daftar Sebagai</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleSelect("TENANT")}
                  className={`p-4 border-2 rounded-lg transition ${
                    form.role === "TENANT"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                      : "border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <div className="text-2xl mb-2">🏠</div>
                  <div className="font-medium">Pencari Kos</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSelect("LANDLORD")}
                  className={`p-4 border-2 rounded-lg transition ${
                    form.role === "LANDLORD"
                      ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                      : "border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <div className="text-2xl mb-2">🏢</div>
                  <div className="font-medium">Pemilik Kos</div>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {loading ? "Loading..." : "Daftar"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Sudah punya akun?{" "}
            <Link to="/" className="text-emerald-600 font-medium hover:underline">
              Login Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};