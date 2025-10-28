import React from "react";
import { Link } from "react-router-dom";
import { Search, BarChart3, TrendingUp, Users, Target, Zap } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 text-gray-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-indigo-400 to-blue-400 rounded-full blur-3xl opacity-20 animate-float-delayed"></div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center flex-grow px-6 pt-20 pb-12 relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-80 backdrop-blur-sm rounded-full shadow-sm border border-blue-100 mb-6 animate-fadeIn">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-medium text-gray-700">Data-Driven Football Analytics</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-700 via-emerald-600 to-green-700 bg-clip-text text-transparent mb-6 animate-fadeIn leading-tight">
          Analisis Karakteristik
          <br />
          <span className="text-5xl sm:text-7xl lg:text-8xl">Penyerang Eropa</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-600 mb-12 leading-relaxed max-w-2xl animate-fadeIn px-4">
          Platform berbasis machine learning untuk mengklasterisasi pemain sepak bola dari lima liga top Eropa menggunakan algoritma <span className="font-semibold text-emerald-700">HDBSCAN</span> dan <span className="font-semibold text-blue-700">PCA</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn mb-16">
          <Link
            to="/search"
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 text-white font-semibold shadow-xl shadow-emerald-200 hover:shadow-2xl hover:shadow-emerald-300 transform hover:scale-105 transition duration-300 flex items-center gap-3"
          >
            <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Cari Pemain
          </Link>

          <Link
            to="/visualization"
            className="group px-8 py-4 rounded-2xl bg-white text-gray-800 font-semibold shadow-xl hover:shadow-2xl border border-gray-200 transform hover:scale-105 transition duration-300 flex items-center gap-3"
          >
            <BarChart3 className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            Visualisasi Klaster
          </Link>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-4 gap-6 sm:gap-12 max-w-4xl w-full px-4">
          <StatCard number="14" label="Liga Eropa" />
          <StatCard number="HDBSCAN" label="Algoritma" />
          <StatCard number="PCA" label="Reduksi Dimensi" />
          <StatCard number="DBI & DBCV" label="Evaluasi" />
        </div>
      </div>

      {/* Striker Types Section */}
      <section className="relative z-10 px-6 sm:px-10 py-20 bg-white bg-opacity-60 backdrop-blur-md border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Klasterisasi Pemain</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Tipe Penyerang Eropa Secara Umum
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sistem mengidentifikasi lima kategori penyerang berdasarkan pola statistik dan karakteristik permainan
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StrikerCard
              title="Goal Poacher"
              gradient="from-blue-500 to-blue-600"
              icon="🎯"
              desc="Spesialis penyelesaian akhir dengan konversi tinggi di area penalti"
              stats={["High Goals", "Low Assists", "Penalty Box Focus"]}
            />
            <StrikerCard
              title="Playmaker"
              gradient="from-emerald-500 to-green-600"
              icon="🎨"
              desc="Kreator peluang dengan visi permainan dan passing akurat"
              stats={["High Assists", "Passes", "Chance Creation"]}
            />
            <StrikerCard
              title="Complete Forward"
              gradient="from-amber-500 to-orange-600"
              icon="⚡"
              desc="Pemain serba bisa dengan kontribusi menyeluruh dalam serangan"
              stats={["Goals + Assists", "All-round", "Versatile"]}
            />
            <StrikerCard
              title="Impact Substitute"
              gradient="from-purple-500 to-indigo-600"
              icon="🔥"
              desc="Efisien dalam waktu terbatas dengan rasio kontribusi tinggi"
              stats={["Per 90 Stats", "Super Sub", "Efficient"]}
            />
            <StrikerCard
              title="Underperforming"
              gradient="from-red-500 to-rose-600"
              icon="📉"
              desc="Kontribusi di bawah ekspektasi relatif terhadap waktu bermain"
              stats={["Low Output", "Below Average", "Development"]}
            />
            <div className="hidden lg:flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl border-2 border-dashed border-gray-200">
              <div className="text-center">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-500">Machine Learning</p>
                <p className="text-xs text-gray-400 mt-1">Powered by HDBSCAN</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gradient-to-r from-slate-900 to-blue-900 text-white text-center py-8 mt-auto">
        <p className="font-semibold text-lg mb-1">
          Arethusa Rayhan Subrata
        </p>
        <p className="text-blue-200 text-sm">
          Universitas Tarumanagara — 2025
        </p>
        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-blue-300">
          <Zap className="w-3 h-3" />
          <span>Football Analytics Platform</span>
        </div>
      </footer>

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 25s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
}

function StatCard({ number, label }) {
  return (
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-1">
        {number}
      </div>
      <div className="text-xs sm:text-sm text-gray-500 font-medium">{label}</div>
    </div>
  );
}

function StrikerCard({ title, gradient, icon, desc, stats }) {
  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:scale-105">
      {/* Header with Gradient */}
      <div className={`bg-gradient-to-r ${gradient} p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 text-6xl opacity-20 transform rotate-12">
          {icon}
        </div>
        <div className="relative z-10">
          <div className="text-4xl mb-2">{icon}</div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {desc}
        </p>
        
        {/* Stats Tags */}
        <div className="flex flex-wrap gap-2">
          {stats.map((stat, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-200"
            >
              {stat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;