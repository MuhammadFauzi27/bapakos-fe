import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="flex min-h-screen">
      {/* Panel kiri - Gambar */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sky-500 to-blue-600 items-center justify-center p-12">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">BapaKos</h1>
          <p className="text-xl opacity-90">Temukan kos impian Anda dengan mudah</p>
        </div>
      </div>

      {/* Panel kanan - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-400 text-3xl mb-4">👨🏻‍🦱</div>
            <h2 className="text-3xl font-bold text-slate-800">Selamat Datang</h2>
            <p className="text-slate-600 mt-2">Masuk ke akun BapaKos Anda</p>
          </div>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
              <input
                type="text"
                placeholder="Masukkan username"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Masukkan password"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <Link
              to="/admin/dashboard"
              className="block w-full text-center bg-sky-600 text-white py-3 rounded-lg font-medium hover:bg-sky-700 transition"
            >
              Login
            </Link>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Belum punya akun?{" "}
            <Link to="/register" className="text-sky-600 font-medium hover:underline">
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
