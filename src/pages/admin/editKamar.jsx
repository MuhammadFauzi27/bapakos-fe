import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetKostById, useLandlordPatchKostById, useUploadKostImages } from "../../services/hooks/useLandlord.jsx";
import {baseUrlImg} from "../../services/apiJson.js";

export const splitAndKeepRest = (str, separator, limit) => {
  if (!str) return [];

  const parts = str.split(separator);

  if (parts.length <= limit) {
    return parts;
  }

  const result = parts.slice(0, limit - 1);
  const rest = parts.slice(limit - 1).join(separator);

  result.push(rest);
  return result;
};

export const UpdateKos = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getKostById, loading: fetchLoading, error: fetchError } = useGetKostById();
  const { patchKostById, loading: updateLoading, error: updateError } = useLandlordPatchKostById();
  const { uploadImages, loading: uploadLoading, error: uploadError } = useUploadKostImages();

  const [formData, setFormData] = useState({
    name: '',
    totalRooms: '',
    price: '',
    description: '',
    provinsi: '',
    kota: '',
    kodePos: '',
    alamatKos: '',
    facilities: []
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Fetch data kost saat komponen dimount
  useEffect(() => {
    const fetchKostData = async () => {
      try {
        const result = await getKostById({ id });
        if (result?.data) {
          const data = result.data;
          const location = splitAndKeepRest(data.location, '.', 4);

          console.log(data.totalRooms)

          setFormData({
            name: data.name || '',
            totalRooms: data.totalRooms || '',
            price: data.price || '',
            description: data.description || '',
            provinsi: location[0] || '',
            kota: location[1] || '',
            kodePos: location[2] || '',
            alamatKos: location[3] || '',
            facilities: data.facilities || []
          });

          // Set existing images jika ada
          if (data.images && data.images.length > 0) {
            setExistingImages(data.images);
          }

          setDataLoaded(true);
        }
      } catch (error) {
        console.error('Error fetching kost:', error);
        alert('Gagal memuat data kos');
      }
    };

    if (id) {
      fetchKostData();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      facilities: checked
        ? [...prev.facilities, id]
        : prev.facilities.filter(f => f !== id)
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreviewImages([URL.createObjectURL(file)]);
  };

  const handleSubmit = async () => {
    try {
      // Validasi sederhana
      if (!formData.name || !formData.price || !formData.totalRooms) {
        alert('Mohon lengkapi data yang wajib diisi');
        return;
      }

      // Gabungkan lokasi
      const lokasi = [formData?.provinsi, formData?.kota, formData?.kodePos, formData?.alamatKos]
        .filter(Boolean)
        .join(".");

      const patchData = {};
      if ('name' in formData) patchData.name = formData.name;
      if ('price' in formData) patchData.price = parseInt(formData.price);
      if ('totalRooms' in formData) patchData.total_rooms = parseInt(formData.totalRooms);
      if ('description' in formData) patchData.description = formData.description;
      if ('provinsi' in formData || 'kota' in formData || 'kodePos' in formData || 'alamatKos' in formData) {
        patchData.location = lokasi;
      }
      if ('facilities' in formData) patchData.facilities = formData.facilities;

      // Step 1: Update Kost
      await patchKostById({
        id,
        data: patchData
      });

      // Step 2: Upload gambar baru jika ada
      if (imageFile) {
        console.log("Uploading new image: ", imageFile);
        await uploadImages(id, imageFile);
      }

      alert('Kos berhasil diperbarui!');
      navigate('/admin/dashboard'); // Redirect ke halaman dashboard atau list

    } catch (error) {
      console.error('Error:', error);
      alert('Gagal memperbarui kos: ' + error.message);
    }
  };

  const handleCancel = () => {
    if (confirm('Apakah Anda yakin ingin membatalkan? Perubahan yang belum disimpan akan hilang.')) {
      navigate(-1); // Kembali ke halaman sebelumnya
    }
  };

  const isLoading = fetchLoading || updateLoading || uploadLoading;

  // Loading state saat fetch data
  if (fetchLoading && !dataLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Memuat data kos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">

      {/* Error Messages */}
      {(fetchError || updateError || uploadError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {fetchError || updateError || uploadError}
        </div>
      )}

      {/* ================= CARD ATAS ================= */}
      <div className="bg-white rounded-xl p-6 border space-y-4">

        <h2 className="text-lg font-semibold mb-4">Edit Data Kos</h2>

        {/* Nama Kos */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Nama Kos <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Contoh: Kos Melati Indah"
            className="w-full border rounded-lg px-4 py-2 text-sm"
          />
        </div>

        {/* Jumlah Kamar + Harga */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-medium block mb-1">
              Jumlah Kamar <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="totalRooms"
              value={formData.totalRooms}
              onChange={handleInputChange}
              placeholder="Contoh: 10"
              className="w-full border rounded-lg px-4 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">
              Harga Kos (per bulan) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Contoh: 850000"
              className="w-full border rounded-lg px-4 py-2 text-sm"
            />
          </div>

        </div>

        {/* Deskripsi */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Deskripsi
          </label>
          <textarea
            rows="3"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Berikan deskripsi singkat mengenai properti Anda..."
            className="w-full border rounded-lg px-4 py-2 text-sm resize-none"
          />
        </div>

      </div>

      {/* ================= CARD BAWAH ================= */}
      <div className="bg-white rounded-xl p-6 border space-y-6">

        <h2 className="text-base font-semibold">
          Lokasi & Gambar
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* KIRI */}
          <div className="lg:col-span-2 space-y-4">

            {/* Provinsi & Kota */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="text-sm font-medium block mb-1">
                  Provinsi
                </label>
                <select
                  className="w-full border rounded-lg px-4 py-2 text-sm"
                  name="provinsi"
                  value={formData.provinsi}
                  onChange={handleInputChange}
                >
                  <option value="">Pilih Provinsi</option>
                  <option value="Jakarta">Jakarta</option>
                  <option value="Jawa Barat">Jawa Barat</option>
                  <option value="Jawa Tengah">Jawa Tengah</option>
                  <option value="Jawa Timur">Jawa Timur</option>
                  <option value="Sumatera Selatan">Sumatera Selatan</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Kota / Kabupaten
                </label>
                <select
                  className="w-full border rounded-lg px-4 py-2 text-sm"
                  name="kota"
                  value={formData.kota}
                  onChange={handleInputChange}
                >
                  <option value="">Pilih Kota/Kabupaten</option>
                  <option value="Kota Bandung">Kota Bandung</option>
                  <option value="Kota Jakarta">Kota Jakarta</option>
                  <option value="Kota Surabaya">Kota Surabaya</option>
                  <option value="Kota Bekasi">Kota Bekasi</option>
                  <option value="Kota Malang">Kota Malang</option>
                </select>
              </div>

            </div>

            {/* Kode Pos */}
            <div>
              <label className="text-sm font-medium block mb-1">
                Kode Pos
              </label>
              <input
                type="text"
                name="kodePos"
                value={formData.kodePos}
                onChange={handleInputChange}
                placeholder="Contoh: 17111"
                className="w-full border rounded-lg px-4 py-2 text-sm"
              />
            </div>

            {/* Alamat */}
            <div>
              <label className="text-sm font-medium block mb-1">
                Alamat
              </label>
              <textarea
                rows="3"
                name="alamatKos"
                value={formData.alamatKos}
                onChange={handleInputChange}
                placeholder="Nama jalan, nomor rumah, kecamatan, desa/kelurahan, RT/RW..."
                className="w-full border rounded-lg px-4 py-2 text-sm resize-none"
              />
            </div>

          </div>

          {/* KANAN - UPLOAD GAMBAR */}
          <div>
            <label className="text-sm font-medium block mb-2">
              Gambar Properti
            </label>

            {/* Existing Images */}
            {existingImages.length > 0 && previewImages.length === 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Gambar saat ini:</p>
                <div className="grid grid-cols-2 gap-2">
                  {existingImages.map((img, idx) => (
                    console.log(`${baseUrlImg}/${img.image_url}`),
                    <img
                      key={idx}
                      src={`${baseUrlImg}/${img.image_url}`}
                      alt={`Existing ${idx + 1}`}
                      className="w-full h-20 object-cover rounded border"
                      onError={(e) => {
                        console.log("--- ERROR LOAD GAMBAR ---");
                        console.log("URL yang dicoba:", `${baseUrlImg}/${img.image_url}`);
                      }}
                      onLoad={() => console.log("Berhasil load:", `${baseUrlImg}/${img.image_url}`)}
                    />
                  ))}
                </div>
              </div>
            )}

            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <label
              htmlFor="fileInput"
              className="border-2 border-dashed rounded-xl h-[220px] flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-blue-400 transition"
            >
              {previewImages.length > 0 ? (
                <div className="w-full h-full p-2 overflow-auto">
                  <div className="grid grid-cols-2 gap-2">
                    {previewImages.map((preview, idx) => (
                      <img
                        key={idx}
                        src={preview}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-center mt-2">
                    Gambar baru dipilih
                  </p>
                </div>
              ) : (
                <>
                  <span className="text-3xl mb-1">＋</span>
                  <p className="text-sm">Klik untuk memilih gambar baru...</p>
                </>
              )}
            </label>
          </div>

        </div>

        {/* FASILITAS */}
        <div>
          <h3 className="text-sm font-medium mb-3">
            Fasilitas
          </h3>

          <div className="flex flex-wrap gap-6 text-sm">

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="AC"
                checked={formData.facilities.includes('AC')}
                onChange={handleCheckboxChange}
              />
              AC
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="ENSUITE_BATHROOM"
                checked={formData.facilities.includes('ENSUITE_BATHROOM')}
                onChange={handleCheckboxChange}
              />
              Kamar Mandi Dalam
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="SHARED_BATHROOM"
                checked={formData.facilities.includes('SHARED_BATHROOM')}
                onChange={handleCheckboxChange}
              />
              Kamar Mandi Luar
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="WIFI"
                checked={formData.facilities.includes('WIFI')}
                onChange={handleCheckboxChange}
              />
              Wifi
            </label>

          </div>
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="px-5 py-2 text-sm border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Memperbarui...
              </>
            ) : (
              'Perbarui'
            )}
          </button>
        </div>

      </div>

    </div>
  );
};