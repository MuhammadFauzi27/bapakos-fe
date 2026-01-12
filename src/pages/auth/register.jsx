import {Link} from "react-router-dom";

export const Register = () => {
  return (
    <div className="bg-white p-8 rounded shadow w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Nama"
          className="w-full border p-2 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Register
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-gray-600">
        Sudah punya akun?{' '}
        <Link to="/" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}