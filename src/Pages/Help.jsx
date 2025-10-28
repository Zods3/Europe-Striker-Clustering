import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaInfoCircle, FaUsers, FaChartLine } from "react-icons/fa";

function Help() {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-green-100 flex flex-col items-center text-gray-800 px-6 py-20">
      {/* ===== Title Section ===== */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-green-700 mb-6 text-center drop-shadow-md">
        🧭 Pusat Bantuan & Panduan Penggunaan
      </h1>
      <p className="max-w-3xl text-center text-lg text-gray-700 mb-12 leading-relaxed">
        Halaman ini menjelaskan cara menggunakan <span className="font-semibold text-indigo-700">StrikerMap</span>, platform analisis penyerang liga top Eropa berdasarkan efektivitas serangan.
      </p>

      {/* ===== Content Section ===== */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-10 max-w-5xl w-full space-y-12 border border-blue-100">
        
        {/* 1. Player Search */}
        <section className="flex items-start space-x-4">
          <FaSearch className="text-3xl text-blue-600 mt-1" />
          <div>
            <h2 className="text-2xl font-bold text-blue-800 mb-2">🔍 Player Search</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Fitur ini memungkinkan pengguna mencari pemain sepak bola berdasarkan nama. Hasil pencarian menampilkan klaster tempat pemain tergabung, nilai PCA, dan ringkasan performa pemain sepanjang musim.
            </p>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Ketik sebagian atau seluruh nama pemain untuk menemukan data yang relevan.</li>
              <li>Gunakan filter klaster untuk menampilkan pemain dari kelompok tertentu.</li>
              <li>Hasil pencarian memberikan ringkasan performa utama seperti gol, assist, menit bermain, dan kontribusi serangan.</li>
            </ul>
          </div>
        </section>

        {/* 2. Player Detail & Compare */}
        <section className="flex items-start space-x-4">
          <FaInfoCircle className="text-3xl text-green-600 mt-1" />
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">📝 Player Detail & Compare</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Klik pemain untuk melihat detail performa lengkap, termasuk statistik gol, assist, menit bermain, kontribusi serangan, tipe serangan yang dominan, serta nilai PCA per dimensi. Fitur <span className="font-bold text-green-700">Compare</span> memungkinkan membandingkan dua pemain secara berdampingan, memudahkan analisis perbedaan performa dan karakteristik serangan.
            </p>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Statistik lengkap pemain ditampilkan per musim dan per pertandingan.</li>
              <li>Insight tambahan seperti tipe serangan, efisiensi gol, dan kontribusi terhadap peluang tim.</li>
              <li>Compare memvisualisasikan kedua pemain dalam grafik dan tabel berdampingan untuk analisis langsung.</li>
            </ul>
          </div>
        </section>

        {/* 3. Visualization */}
        <section className="flex items-start space-x-4">
          <FaChartLine className="text-3xl text-yellow-600 mt-1" />
          <div>
            <h2 className="text-2xl font-bold text-yellow-800 mb-2">📊 Visualization</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Halaman visualisasi menampilkan distribusi pemain dalam klaster hasil HDBSCAN menggunakan mode 2D atau 3D. Warna menunjukkan klaster berbeda, membantu melihat pola performa pemain dan hubungan antar klaster.
            </p>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Pilih mode <span className="text-yellow-600 font-semibold">Tampilan 2D</span> atau <span className="text-yellow-600 font-semibold">3D</span> untuk melihat distribusi pemain.</li>
              <li>Arahkan kursor ke titik untuk melihat detail pemain secara langsung.</li>
              <li>Gunakan filter klaster untuk fokus pada kelompok tertentu dan analisis performa spesifik.</li>
            </ul>
          </div>
        </section>

        {/* 4. Cluster Summary */}
        <section className="flex items-start space-x-4">
          <FaUsers className="text-3xl text-purple-600 mt-1" />
          <div>
            <h2 className="text-2xl font-bold text-purple-800 mb-2">📋 Cluster Summary</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Setiap klaster adalah hasil HDBSCAN dan merepresentasikan tipe penyerang tertentu. Ringkasan klaster menampilkan jumlah pemain, karakteristik performa umum, serta insight dari analisis data, seperti tipe serangan dominan, rata-rata gol, assist, dan kontribusi terhadap tim.
            </p>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Membantu memahami tipe penyerang di tiap klaster: finisher, playmaker, atau serba bisa.</li>
              <li>Menunjukkan perbedaan karakteristik antar klaster secara kuantitatif dan visual.</li>
              <li>Mempermudah perbandingan performa antar pemain dalam satu klaster atau antar klaster.</li>
              <li>Tersedia opsi untuk melihat <span className="text-purple-600 font-semibold">Detail Lengkap</span> klaster, termasuk penjelasan karakteristik rinci tiap klaster dan daftar pemain yang termasuk dalam klaster tersebut.</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-600 mb-4">Kembali ke halaman utama?</p>
        <Link
          to="/"
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 shadow-md transition duration-300"
        >
          ⬅️ Kembali ke Home
        </Link>
      </div>
      
    </div>
  );
}

export default Help;
