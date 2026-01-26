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
      return await apiJson("/tenant/booking","POST", {
        id: payload.id,
        landlordId: payload.landlordId,
        name: payload.name,
        price: payload.price,
        description: payload.description,
        location: payload.location,
        facilities: payload.facilities,
        images: payload.images,
      }, headers)
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    submitBooking,
    loading,
    error,
  }
}

export const useLandlordGetTransaction = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const headers = {
    "Content-Type": "application/json",
  }
  const token = localStorage.getItem("token")
  headers.Authorization = `Bearer ${token}`

  const getTransaction = async () => {
    setLoading(true)
    setError(null)

    try {
      return await apiJson("/landlord/transaction", "GET", undefined, headers)
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    getTransaction,
    loading,
    error,
  }
}

export const useLandlordUpdateTransaction = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const headers = {
    "Content-Type": "application/json",
  }
  const token = localStorage.getItem("token")
  headers.Authorization = `Bearer ${token}`

  const getTransaction = async (payload) => {
    setLoading(true)
    setError(null)

    try {
      return await apiJson(`/landlord/transaction/booking/${payload.bookingId}`, "PATCH", {
        status: payload.status
      }, headers)
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    getTransaction,
    loading,
    error,
  }
}