import {useState} from "react";
import {apiJson} from "../apiJson.js";

export const useBookingKost = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const headers = {
    "Content-Type": "application/json",
  }
  const token = localStorage.getItem("token")
  headers.Authorization = `Bearer ${token}`

  const submitBooking = async (payload) => {
    setLoading(true)
    setError(null)

    try {
      return await apiJson("/tenant/booking", headers,"POST", {
        id: payload.id,
        landlordId: payload.id,
        name: payload.title,
        price: payload.price,
        description: payload.deskripsiKost,
        location: payload.address,
        facilities: payload.fasilitas,
        images: payload.gambarKost,
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