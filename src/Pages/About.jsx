import React from "react";
import { FaChartLine, FaUsers, FaFootballBall, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50">

      {/* ===== Content ===== */}
      <div className="flex flex-col items-center pt-28 px-4 pb-10 w-full">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-8 text-center">
          Tentang Proyek Ini 📘
        </h1>

        <div className="max-w-5xl w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 space-y-6 border border-blue-100">
          <p className="text-gray-700 text-lg text-center leading-relaxed">
            Website ini dikembangkan sebagai bagian dari penelitian skripsi berjudul{" "}
            <strong className="text-blue-600">
              "Pemetaan Karakteristik Permainan Penyerang Sepak Bola Liga Top Eropa
              Berdasarkan Efektivitas Serangan Menggunakan HDBSCAN"
            </strong>.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 text-center">
            {/* Data Pemain */}
            <div className="p-4 bg-green-50 rounded-2xl shadow hover:shadow-lg transition">
              <FaFootballBall className="text-4xl text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold text-lg text-green-700 mb-1">Data Pemain</h3>
              <p className="text-gray-600 text-sm">
                Menggunakan data gol, assist, menit bermain, dan kontribusi serangan pemain dari Transfermarkt sebagai dasar analisis performa pemain.
              </p>
            </div>

            {/* Analisis Klaster */}
            <div className="p-4 bg-blue-50 rounded-2xl shadow hover:shadow-lg transition">
              <FaChartLine className="text-4xl text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-lg text-blue-700 mb-1">Analisis Klaster</h3>
              <p className="text-gray-600 text-sm">
                Data dianalisis menggunakan <strong>HDBSCAN</strong> untuk mengelompokkan pemain dengan karakteristik serangan yang mirip.
              </p>
            </div>

            {/* Visualisasi PCA */}
            <div className="p-4 bg-yellow-50 rounded-2xl shadow hover:shadow-lg transition">
              <FaUsers className="text-4xl text-yellow-600 mx-auto mb-2" />
              <h3 className="font-semibold text-lg text-yellow-700 mb-1">Visualisasi</h3>
              <p className="text-gray-600 text-sm">
                <strong>PCA</strong> digunakan untuk mereduksi dimensi data, sehingga klaster dapat divisualisasikan dalam grafik interaktif.
              </p>
            </div>

            {/* Evaluasi Klaster */}
            <div className="p-4 bg-purple-50 rounded-2xl shadow hover:shadow-lg transition">
              <FaCheckCircle className="text-4xl text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold text-lg text-purple-700 mb-1">Evaluasi Klaster</h3>
              <p className="text-gray-600 text-sm">
                Penelitian menggunakan <strong>DBI</strong> dan <strong>DBCV</strong> untuk menilai kualitas klaster, memastikan hasil analisis valid dan dapat diandalkan.
              </p>
            </div>
          </div>

          <p className="text-gray-600 text-center mt-8 leading-relaxed">
            Proyek ini membantu memahami karakteristik permainan penyerang secara data-driven dan mempermudah perbandingan performa antar pemain di liga top Eropa.
          </p>

          <div className="text-center mt-6">
            <Link
              to="/"
              className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition font-semibold"
            >
              🏠 Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* ===== Footer full-width ===== */}
      <footer className="bg-blue-800 text-white text-center py-6 w-full mt-auto">
        <p className="font-medium">
          © 2025 Arethusa Rayhan Subrata — Universitas Tarumanagara
        </p>
        <p className="text-sm text-blue-200 mt-1">
          Sistem Visualisasi Klasterisasi Pemain Sepak Bola
        </p>
      </footer>
    </div>
  );
}

export default About;
