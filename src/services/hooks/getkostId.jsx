import {useState} from "react";
import {apiJson} from "../apiJson.js";

export const getKostId = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const headers = {
    "Content-Type": "application/json",
  }
  const token = localStorage.getItem("token")
  headers.Authorization = `Bearer ${token}`

  const getKostId = async (payload) => {
    setLoading(true)
    setError(null)

    try {
      return await apiJson("/landlord/dashboard/kost/4", headers, "GET")
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