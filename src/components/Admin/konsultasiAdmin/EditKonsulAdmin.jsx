import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-quill/dist/quill.snow.css";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditKonsulAdmin = () => {
  const [activePage, setActivePage] = useState("Konsultasi");
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [namaPasien, setNamaPasien] = useState("");
  const [namaOrtu, setNamaOrtu] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [nomor, setNomor] = useState("");
  const [placeBirth, setPlaceBirth] = useState("");
  const [kategori, setKategori] = useState("");
  const [viaKonsul, setViaKonsul] = useState("");
  const [riwayat, setRiwayat] = useState("");
  const [keluhan, setKeluhan] = useState("");

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("nama_pasien", namaPasien);
    data.append("nama_ortu", namaOrtu);
    data.append("tempat_lahir", placeBirth);
    data.append("tgl_lahir", dateBirth);
    data.append("gender", gender);
    data.append("no_wa", nomor);
    data.append("alamat", address);
    data.append("kategori_pasien", kategori);
    data.append("via_konsul", viaKonsul);
    data.append("riwayat", riwayat);
    data.append("keluhan", keluhan);

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_BASE_URL}/konsul/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      // Navigasi ke halaman detail blog setelah berhasil update

      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate(`/admin/konsul`);
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleKategoriPasienChange = (e) => {
    setKategori(e.target.value);
  };

  const handleViaKonsulChange = (e) => {
    setViaKonsul(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  useEffect(() => {
    // Fetch data blog yang akan diupdate
    const fetchKonsul = async () => {
      console.log("fetch konsul running");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/konsul/${id}`
        );
        const konsulData = response.data.data;
        setNamaPasien(konsulData.nama_pasien);
        setNamaOrtu(konsulData.nama_ortu);
        setGender(konsulData.gender);
        setAddress(konsulData.alamat);
        setDateBirth(konsulData.tgl_lahir);
        setNomor(konsulData.no_wa);
        setPlaceBirth(konsulData.tempat_lahir);
        setKategori(konsulData.kategori_pasien);
        setRiwayat(konsulData.riwayat);
        setKeluhan(konsulData.keluhan);
        setViaKonsul(konsulData.via_konsul);
        console.log(konsulData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchKonsul();
  }, [id]);

  return (
    <div className="flex">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="w-[1000px] mx-auto mt-10 justify-center">
        {/* judul */}
        <div>
          <h1 className="text-sizeTri text-textSec font-bold">
            Detail Konsultasi
          </h1>
          <p className="my-3 text-textFunc">Dashboard / Konsultasi / Edit</p>
        </div>
        {/* judul */}
        {/* content */}
        <div className="bg-bgSec w-full mt-5 shadow-sm shadow-textFunc">
          <div className="">
            <form onSubmit={handleUpdate}>
              <h1 className="p-3 font-bold bg-bgFunc3 text-textOpt rounded-sm rounded-t-md">
                DATA PRIBADI
              </h1>
              <div className="p-5">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="nama_pasien"
                    id="nama_pasien"
                    value={namaPasien}
                    onChange={(e) => setNamaPasien(e.target.value)}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-bgFunc3 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="nama_pasien"
                    className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-bgFunc3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Nama Pasien
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="nama_ortu"
                    id="nama_ortu"
                    value={namaOrtu}
                    onChange={(e) => setNamaOrtu(e.target.value)}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-bgFunc3 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="nama_ortu"
                    className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-bgFunc3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Nama Orang Tua
                  </label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="tempat_lahir"
                      id="tempat_lahir"
                      value={placeBirth}
                      onChange={(e) => setPlaceBirth(e.target.value)}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-bgFunc3 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      for="tempat_lahir"
                      className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-bgFunc3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Tempat Lahir
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="date"
                      name="tgl_lahir"
                      id="tgl_lahir"
                      value={dateBirth}
                      onChange={(e) => setDateBirth(e.target.value)}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-bgFunc3 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      for="tgl_lahir"
                      className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-bgFunc3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Tanggal Lahir
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                    <select
                      name="gender"
                      id="gender"
                      value={gender}
                      onChange={handleGenderChange}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-bgFunc3 peer"
                      placeholder=" "
                      required
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="L">Laki-Laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                    <label
                      htmlFor="kategori_pasien"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-bgFunc3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Jenis Kelamin
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-6 group">
                    <input
                      type="number"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      name="no_wa"
                      id="no_wa"
                      value={nomor}
                      onChange={(e) => setNomor(e.target.value)}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-bgFunc3 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      for="no_wa"
                      className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-bgFunc3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Nomor Whatsapp (62812345678)
                    </label>
                  </div>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="alamat"
                    id="alamat"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="h-[100px] block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-bgFunc3 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="alamat"
                    className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-bgFunc3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Alamat
                  </label>
                </div>
              </div>

              <h1 className="p-3 font-bold bg-bgFunc3 text-textOpt rounded-sm rounded-t-md">
                DATA KONSULTASI
              </h1>
              <div className="p-5">
                <div className="relative z-0 w-full mb-6 group">
                  <select
                    name="kategori_pasien"
                    id="kategori_pasien"
                    value={kategori}
                    onChange={handleKategoriPasienChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-bgFunc3 peer"
                    placeholder=" "
                    required
                  >
                    <option value="">Pilih Kategori Pasien</option>
                    <option value="Konsultasi Anak (5-11 tahun)">
                      Konsultasi Anak (5-11 tahun)
                    </option>
                    <option value="Konsultasi Remaja (12-25 tahun)">
                      Konsultasi Remaja (12-25 tahun)
                    </option>
                    <option value="Konsultasi Dewasa (26-45 tahun)">
                      Konsultasi Dewasa (26-45 tahun)
                    </option>
                  </select>
                  <label
                    htmlFor="kategori_pasien"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-bgFunc3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Kategori Pasien
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <select
                    name="via_konsul"
                    id="via_konsul"
                    value={viaKonsul}
                    onChange={handleViaKonsulChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-bgFunc3 peer"
                    placeholder=" "
                    required
                  >
                    <option value="">Pilih Via Konsul</option>
                    <option value="Via Online">Via Online</option>
                    <option value="Via Offline">Via Offline</option>
                  </select>
                  <label
                    htmlFor="via_konsul"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-bgFunc3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Via Konsul
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="riwayat"
                    id="riwayat"
                    value={riwayat}
                    onChange={(e) => setRiwayat(e.target.value)}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-bgFunc3 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="riwayat"
                    className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-bgFunc3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Riwayat Penyakit
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    name="keluhan"
                    id="keluhan"
                    value={keluhan}
                    onChange={(e) => setKeluhan(e.target.value)}
                    className="h-[100px] block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-bgFunc3 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="keluhan"
                    className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-bgFunc3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Keluhan
                  </label>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  position: "relative",
                }}
                className="p-5 flex flex-wrap gap-2"
              >
                <button
                  type="button"
                  className="w-[100px] px-4 py-2 bg-bgFunc text-white rounded-md hover:bg-bgFunc3 focus:outline-none focus:ring focus:ring-gray-300"
                  onClick={handleGoBack}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-[100px] px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* content */}
      </div>
    </div>
  );
};

export default EditKonsulAdmin;
