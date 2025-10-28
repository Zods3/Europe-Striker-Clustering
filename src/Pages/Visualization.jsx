import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // 🆕 Import Link
import Plot from "react-plotly.js";

function Visualization() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [clusterFilter, setClusterFilter] = useState("");
  const [mode3D, setMode3D] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clusterSummary, setClusterSummary] = useState([]);
  const [evaluation, setEvaluation] = useState(null);
  const [selectedCluster, setSelectedCluster] = useState(null);

  // 🔹 Load data cluster + summary + evaluation
  useEffect(() => {
    Promise.all([
      fetch("/data/cluster_results.json").then((res) => res.json()),
      fetch("/data/cluster_summary.json").then((res) => res.json()),
      fetch("/data/evaluation_result.json").then((res) => res.json()),
    ])
      .then(([results, summary, evalRes]) => {
        setData(results);
        setFilteredData(results);
        setClusterSummary(summary);
        setEvaluation(evalRes);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat data:", err);
        setLoading(false);
      });
  }, []);

  const handleClusterFilter = (e) => {
    const value = e.target.value;
    setClusterFilter(value);
    if (value === "") {
      setFilteredData(data);
    } else {
      const clusterNum = parseInt(value);
      setFilteredData(data.filter((d) => d.cluster === clusterNum));
    }
  };

  const toggleMode = () => setMode3D(!mode3D);
  const openClusterDetail = (cluster) => setSelectedCluster(cluster);
  const closeClusterDetail = () => setSelectedCluster(null);

  // 🎨 Color mapping untuk cluster
  const getClusterColor = (clusterId) => {
    const colors = {
      '-1': 'from-purple-500 to-pink-500',
      '0': 'from-blue-500 to-cyan-500',
      '1': 'from-green-500 to-teal-500',
      '2': 'from-yellow-500 to-orange-500',
      '3': 'from-red-500 to-pink-500',
      '4': 'from-indigo-500 to-purple-500',
      '5': 'from-teal-500 to-green-500',
      '6': 'from-orange-500 to-red-500',
      '7': 'from-pink-500 to-rose-500',
      '8': 'from-cyan-500 to-blue-500',
    };
    return colors[clusterId] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-28 pb-10 px-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100">

      {/* 🔹 Header */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-5xl font-extrabold mb-3 drop-shadow-lg flex items-center justify-center gap-2">
          <span className="text-black font-normal">⚽</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Visualisasi Klasterisasi Pemain
          </span>
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Jelajahi hasil klasterisasi pemain sepak bola berdasarkan tiga komponen PCA.
          Gunakan filter cluster atau ubah mode tampilan 2D / 3D untuk melihat pola distribusi pemain.
        </p>
      </div>

      {/* 🔹 Filter dan mode switch */}
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-8">
        <div className="relative">
          <select
            value={clusterFilter}
            onChange={handleClusterFilter}
            className="appearance-none border-2 border-indigo-300 rounded-xl px-5 py-3 pr-10 shadow-lg bg-white hover:border-indigo-400 focus:ring-4 focus:ring-indigo-200 focus:outline-none transition-all cursor-pointer font-medium"
          >
            <option value="">🔍 Semua Cluster</option>
            {clusterSummary.map((c) => (
              <option key={c.cluster} value={c.cluster}>
                Cluster {c.cluster} - {c.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-indigo-600">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        <button
          onClick={toggleMode}
          className={`px-6 py-3 rounded-xl text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            mode3D 
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" 
              : "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
          }`}
        >
          {mode3D ? "📊 Mode 2D" : "🎲 Mode 3D"}
        </button>
      </div>

      {/* 🔹 Area Plot */}
      <div className="bg-white/80 rounded-3xl shadow-2xl p-6 w-full max-w-6xl backdrop-blur-md mb-10 border-4 border-indigo-200">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-4"></div>
            <p className="text-gray-600 italic">Memuat data visualisasi...</p>
          </div>
        ) : mode3D ? (
          <Plot
            data={[{
              x: filteredData.map((d) => d.PC1),
              y: filteredData.map((d) => d.PC2),
              z: filteredData.map((d) => d.PC3),
              text: filteredData.map((d) => `${d.player_name} (Cluster ${d.cluster})`),
              mode: "markers",
              type: "scatter3d",
              marker: {
                color: filteredData.map((d) => d.cluster),
                colorscale: "Viridis",
                size: 6,
                opacity: 0.85,
                line: { color: "white", width: 0.5 },
              },
            }]}
            layout={{
              scene: { xaxis: { title: "PC1" }, yaxis: { title: "PC2" }, zaxis: { title: "PC3" }, camera: { eye: { x: 1.5, y: 1.5, z: 1.5 } } },
              paper_bgcolor: "rgba(255,255,255,0.8)",
              plot_bgcolor: "#f9fafb",
              autosize: true,
              height: 600,
              margin: { l: 60, r: 60, b: 60, t: 80 },
              title: { text: "3D Visualisasi PCA + HDBSCAN", font: { size: 22, color: "#4F46E5" }, x: 0.5 },
            }}
            config={{ displayModeBar: true, responsive: true }}
            style={{ margin: "0 auto", display: "block" }}
          />
        ) : (
          <Plot
            data={[{
              x: filteredData.map((d) => d.PC1),
              y: filteredData.map((d) => d.PC2),
              text: filteredData.map((d) => `${d.player_name} (Cluster ${d.cluster})`),
              mode: "markers",
              type: "scatter",
              marker: {
                color: filteredData.map((d) => d.cluster),
                colorscale: "Viridis",
                size: 8,
                opacity: 0.85,
                line: { color: "white", width: 0.5 },
              },
            }]}
            layout={{
              xaxis: { title: "PC1" },
              yaxis: { title: "PC2" },
              paper_bgcolor: "rgba(255,255,255,0.8)",
              plot_bgcolor: "#f9fafb",
              autosize: true,
              height: 600,
              margin: { l: 60, r: 60, b: 60, t: 80 },
              title: { text: "2D Visualisasi PCA + HDBSCAN", font: { size: 22, color: "#4F46E5" }, x: 0.5 },
            }}
            config={{ displayModeBar: true, responsive: true }}
            style={{ margin: "0 auto", display: "block" }}
          />
        )}
      </div>

      {/* 🔹 Evaluasi Cluster */}
      {evaluation && (
        <div className="bg-gradient-to-br from-white to-indigo-50 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-6xl mb-10 border-2 border-indigo-200">
          <h2 className="flex items-center justify-center gap-2 text-3xl sm:text-4xl font-extrabold text-center mb-6">
            <span className="text-black">🔬</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Evaluasi Kualitas Cluster
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="absolute top-3 right-3 text-3xl">📉</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Davies-Bouldin Index</h3>
              <p className="text-4xl font-extrabold text-yellow-600 mb-2">{evaluation.dbi_score.toFixed(3)}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{evaluation.interpretation.dbi}</p>
            </div>
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="absolute top-3 right-3 text-3xl">📊</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">DBCV Score</h3>
              <p className="text-4xl font-extrabold text-blue-600 mb-2">{evaluation.dbcv_score.toFixed(3)}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{evaluation.interpretation.dbcv}</p>
            </div>
            <div className="relative p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="absolute top-3 right-3 text-3xl">✅</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Overall Quality</h3>
              <p className="text-gray-700 leading-relaxed mb-2">{evaluation.interpretation.overall}</p>
              <div className="flex flex-col gap-1 text-sm">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold">
                  {evaluation.n_clusters} Clusters
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-semibold">
                  {evaluation.outlier_percentage}% Outliers ({evaluation.outliers} pemain)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Ringkasan Cluster */}
      <section className="w-full max-w-6xl space-y-8">
        <h2 className="flex items-center justify-center gap-2 text-3xl sm:text-4xl font-extrabold text-center mb-10">
          <span className="text-black">📋</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Interpretasi Setiap Klaster
          </span>
        </h2>

        {clusterSummary.map((cluster) => (
          <div
            key={cluster.cluster}
            className="group bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border-l-8 border-indigo-500 hover:border-purple-500"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div>
                <h3 className={`text-3xl font-extrabold bg-gradient-to-r ${getClusterColor(cluster.cluster)} text-transparent bg-clip-text`}>
                  Klaster {cluster.cluster}
                </h3>
                <p className="text-xl font-semibold text-gray-700 mt-1">
                  {cluster.label || "Belum Diberi Label"}
                </p>
              </div>
              <button
                onClick={() => openClusterDetail(cluster)}
                className="mt-3 sm:mt-0 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-bold rounded-xl shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95"
              >
                📖 Detail Lengkap
              </button>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">
              {cluster.description || "Deskripsi belum ditambahkan."}
            </p>

            {/* Stats Grid - More Visual */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-3 border border-red-200">
                <div className="text-2xl mb-1">⚽</div>
                <p className="text-xs text-gray-600 font-semibold">Goals/90</p>
                <p className="text-xl font-bold text-red-700">{cluster.avg_stats.G90}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200">
                <div className="text-2xl mb-1">🎯</div>
                <p className="text-xs text-gray-600 font-semibold">Assists/90</p>
                <p className="text-xl font-bold text-blue-700">{cluster.avg_stats.A90}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 border border-green-200">
                <div className="text-2xl mb-1">📊</div>
                <p className="text-xs text-gray-600 font-semibold">G+A/90</p>
                <p className="text-xl font-bold text-green-700">{cluster.avg_stats.GA90}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 border border-purple-200">
                <div className="text-2xl mb-1">⏱️</div>
                <p className="text-xs text-gray-600 font-semibold">Minutes</p>
                <p className="text-xl font-bold text-purple-700">{Math.round(cluster.avg_stats.minutes)}</p>
              </div>
            </div>

            {/* Sample Players - 🆕 WITH LINKS */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                <span className="text-lg mr-2">👥</span>
                Contoh Pemain ({cluster.n_players} total):
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {cluster.players.slice(0, 6).map((p, i) => (
                  <li key={i} className="flex items-center">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                    <Link 
                      to={`/player/${encodeURIComponent(p)}`}
                      className="text-gray-700 hover:text-indigo-600 hover:underline transition-colors cursor-pointer font-medium"
                    >
                      {p}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* 🔹 Popup Detail Cluster - 🆕 IMPROVED WITH CLICKABLE PLAYER LINKS */}
      {selectedCluster && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className={`bg-gradient-to-r ${getClusterColor(selectedCluster.cluster)} p-6 text-white`}>
              <h2 className="text-3xl font-extrabold mb-1">
                Klaster {selectedCluster.cluster} - {selectedCluster.label}
              </h2>
              <p className="text-sm opacity-90">
                {selectedCluster.n_players} pemain | {selectedCluster.avg_stats.minutes} avg minutes
              </p>
            </div>

            {/* Content - SCROLLABLE */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* 🔥 RENDER HTML DENGAN dangerouslySetInnerHTML */}
              <div 
                className="prose prose-sm max-w-none mb-6 
                  prose-headings:text-indigo-700 
                  prose-headings:font-bold 
                  prose-strong:text-indigo-600
                  prose-li:text-gray-700
                  leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: selectedCluster.full_analysis || "Analisis lengkap belum tersedia untuk klaster ini." 
                }}
              />

              {/* Divider */}
              <div className="border-t-2 border-gray-200 my-6"></div>

              {/* Player List - 🆕 WITH CLICKABLE LINKS */}
              <div>
                <h4 className="font-bold text-xl text-gray-800 mb-3 flex items-center">
                  <span className="text-2xl mr-2">👥</span>
                  Daftar Lengkap Pemain ({selectedCluster.players.length}):
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm max-h-[300px] overflow-y-auto bg-gray-50 rounded-xl p-4 border border-gray-200 custom-scrollbar">
                  {selectedCluster.players.map((p, i) => (
                    <li key={i} className="flex items-center group">
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2 group-hover:bg-indigo-700 transition-colors"></span>
                      <Link 
                        to={`/player/${encodeURIComponent(p)}`}
                        className="text-gray-700 hover:text-indigo-600 hover:underline transition-colors cursor-pointer font-medium"
                        onClick={closeClusterDetail} // 🆕 Close modal saat link diklik
                      >
                        {p}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer - Close Button */}
            <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={closeClusterDetail}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                ✖️ Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🎨 Custom Scrollbar Styling */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6366f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4f46e5;
        }
      `}</style>
    </div>
  );
}

export default Visualization;