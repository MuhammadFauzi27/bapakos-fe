import {useState} from "react";
import {apiJson} from "../apiJson.js";

export const useLogin = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submitLogin = async (payload) => {
    setLoading(true)
    setError(null)

    try {
      return await apiJson("/auth/login", "POST", {
        email: payload.email,
        password: payload.password,
      })
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    submitLogin,
    loading,
    error,
  }
}

export const useRegister = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submitRegister = async (payload) => {
    setLoading(true)
    setError(null)

    try {
      return await apiJson("/auth/register", "POST", {
        email: payload.email,
        password: payload.password,
        role: payload.role,
      })
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    submitRegister,
    loading,
    error,
  }
}

export const handleLogout = () => {
  localStorage.removeItem("token")
}