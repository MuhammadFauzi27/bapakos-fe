import {Link} from "react-router-dom";

export const Register = () => {
  return (
    <div className="p-8 shadow w-screen min-h-screen flex">
      <div className="flex size-auto rounded shadow">
        {/* Gambar kiri */}
        <div className="flex md:w-1/2 h-full hidden md:block overflow-hidden">
          <img
            src="/images/banner.png"
            alt="Login Banner"
            className="w-full h-full rounded object-cover"
          />
        </div>

        {/* Form kanan */}
        <div className="w-full md:w-1/2 p-9 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-6">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="size-20 mb-2"
            />
            <h1 className="text-2xl font-bold">Buat Akun BapaKos</h1>
          </div>


          <form className="space-y-4">
            <p className="font-medium">Username</p>
            <input
              type="text"
              placeholder="Nur Intan"
              className="w-full border p-2 rounded"
            />

            <p className="font-medium">Email</p>
            <input
              type="email"
              placeholder="ramad****@gmail.com"
              className="w-full border p-2 rounded"
            />

            <p className="font-medium">Password</p>
            <input
              type="password"
              placeholder="********"
              className="w-full border p-2 rounded"
            />

            <Link
              to="/"
              className="block w-full text-center bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Daftar
            </Link>
          </form>

          <p className="text-sm text-center mt-4 text-gray-600">
            Sudah punya akun?{' '}
            <Link to="/" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}