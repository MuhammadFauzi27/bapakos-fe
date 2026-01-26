import {useState} from "react";
import {apiJson} from "../apiJson.js";

export const useTenantGetKosts = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const headers = {
    "Content-Type": "application/json",
  }
  const token = localStorage.getItem("token")
  headers.Authorization = `Bearer ${token}`

  const getKosts = async () => {
    setLoading(true)
    setError(null)

    try {
      return await apiJson("/tenant/kost", "GET", undefined, headers)
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    getKosts,
    loading,
    error,
  }
}

export const useTenantGetKostById = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const headers = {
    "Content-Type": "application/json",
  }
  const token = localStorage.getItem("token")
  headers.Authorization = `Bearer ${token}`

  const getKostById = async (payload) => {
    setLoading(true)
    setError(null)

    try {
      return await apiJson(`/tenant/kost/${payload.kostId}`, "GET", undefined, headers)
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    getKostById,
    loading,
    error,
  }
}