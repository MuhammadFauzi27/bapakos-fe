import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../pages/auth/login.jsx";
import {Register} from "../pages/auth/register.jsx";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  )
}