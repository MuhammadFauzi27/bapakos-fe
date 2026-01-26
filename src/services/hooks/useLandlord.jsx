import {useState} from "react";
import {apiJson, baseUrl} from "../apiJson.js";

export const useCreateKost = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const headers = {
    "Content-Type": "application/json",
  }
  const token = localStorage.getItem("token")
  headers.Authorization = `Bearer ${token}`

  const submitCreate = async (payload) => {
    setLoading(true)
    setError(null)

    const lokasi = [payload.provinsi, payload.kota, payload.kodePos, payload.alamatKos]
      .filter(Boolean)
      .join(".")

    try {
      return await apiJson("/landlord/dashboard/kost","POST", {
        name: payload.name,
        price: payload.price,
        description: payload.description,
        location: lokasi,
        facilities: payload.facilities,
        totalRooms: payload.totalRooms,
      }, headers)
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    submitCreate,
    loading,
    error,
  }
}

export const useUploadKostImages = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const uploadImages = async (kostId, file) => {
    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("image", file)

    try {
      const token = localStorage.getItem("token")

      const res = await fetch(
        `${baseUrl}/landlord/dashboard/kost/files/${kostId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        }
      )

      return await res.json()
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { uploadImages, loading, error }
}

export const useLandlordGetKostsById = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const headers = {
    "Content-Type": "application/json",
  }
  const token = localStorage.getItem("token")
  headers.Authorization = `Bearer ${token}`

  const getKostsById = async () => {
    setLoading(true)
    setError(null)

    try {
      return await apiJson("/landlord/dashboard/kost", "GET", null, headers)
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    getKostsById,
    loading,
    error,
  }
}

export const useGetKostById = () => {
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
      return await apiJson(`/landlord/dashboard/kost/${payload.id}`, "GET", null, headers)
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

export const useLandlordPatchKostById = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const headers = {
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem("token");
  if (token) headers.Authorization = `Bearer ${token}`;

  const patchKostById = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      return await apiJson(
        `/landlord/dashboard/kost/${payload.id}`,
        "PATCH",
        payload.data,
        headers
      );
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    patchKostById,
    loading,
    error,
  };
};
