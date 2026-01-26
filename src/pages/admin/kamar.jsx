export const TambahKos = () => {
  return (
    <div className="space-y-6">

      {/* ================= CARD ATAS ================= */}
      <div className="bg-white rounded-xl p-6 border space-y-4">

        {/* Nama Kos */}
        <div>
          <label className="text-sm font-medium block mb-1">
            Nama Kos
          </label>
          <input
            type="text"
            name="namaKost"
            placeholder="Contoh: Kos Melati Indah"
            className="w-full border rounded-lg px-4 py-2 text-sm"
          />
        </div>

        {/* Jumlah Kamar + Harga */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm font-medium block mb-1">
              Jumlah Kamar
            </label>
            <input
              type="number"
              name="jumlahKamar"
              placeholder="Contoh: 10"
              className="w-full border rounded-lg px-4 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">
              Harga Kos (per bulan)
            </label>
            <input
              type="number"
              name="hargaKamar"
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
            name="deskripsiKost"
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
                <select className="w-full border rounded-lg px-4 py-2 text-sm" name="provinsi">
                  <option>Pilih Provinsi</option>
                  <option>Jakarta</option>
                  <option>Jawa Barat</option>
                  <option>Jawa Tengah</option>
                  <option>Jawa Timur</option>
                  <option>Sumatera Selatan</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1">
                  Kota / Kabupaten
                </label>
                <select className="w-full border rounded-lg px-4 py-2 text-sm" name="kota">
                  <option>Pilih Kota/Kabupaten</option>
                  <option>Kota Bandung</option>
                  <option>Kota Jakarta</option>
                  <option>Kota Surabaya</option>
                  <option>Kota Bekasi</option>
                  <option>Kota Malang</option>
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
                name="alamatKost"
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

            <div className="border-2 border-dashed rounded-xl h-[220px] flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-blue-400 transition" name="gambarKost">
              <span className="text-3xl mb-1">＋</span>
              <p className="text-sm">Klik untuk memilih gambar...</p>
            </div>
          </div>

        </div>

        {/* FASILITAS */}
        <div>
          <h3 className="text-sm font-medium mb-3">
            Fasilitas
          </h3>

          <div className="flex flex-wrap gap-6 text-sm">

            <label className="flex items-center gap-2" name="fasilitas">
              <input type="checkbox" />
              AC
            </label>

            <label className="flex items-center gap-2" name="fasilitas">
              <input type="checkbox" />
              Kamar Mandi Dalam
            </label>

            <label className="flex items-center gap-2" name="fasilitas">
              <input type="checkbox" />
              Kamar Mandi Luar
            </label>

            <label className="flex items-center gap-2" name="fasilitas">
              <input type="checkbox" />
              Wifi
            </label>

          </div>
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-3 pt-4">
          <button className="px-5 py-2 text-sm border rounded-lg">
            Batal
          </button>
          <button className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg">
            Simpan
          </button>
        </div>

      </div>

    </div>
  );
};
