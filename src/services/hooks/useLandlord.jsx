import {useState} from "react";
import {apiJson} from "../apiJson.js";

export const useCreateKost = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const headers = {
    "Content-Type": "application/json",
  }
  const token = localStorage.getItem("token")
  headers.Authorization = `Bearer ${token}`

  const submitRegister = async (payload) => {
    setLoading(true)
    setError(null)

    try {
      return await apiJson("/auth/register", headers,"POST", {
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