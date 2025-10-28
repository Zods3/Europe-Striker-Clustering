import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Users, Filter } from "lucide-react";

// 🔹 Warna cluster sesuai Visualisation.jsx
const clusterColors = {
  "-1": "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
  "0": "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
  "1": "bg-gradient-to-r from-green-500 to-teal-500 text-white",
  "2": "bg-gradient-to-r from-yellow-500 to-orange-500 text-white",
  "3": "bg-gradient-to-r from-red-500 to-pink-500 text-white",
  "4": "bg-gradient-to-r from-indigo-500 to-purple-500 text-white",
  "5": "bg-gradient-to-r from-teal-500 to-green-500 text-white",
  "6": "bg-gradient-to-r from-orange-500 to-red-500 text-white",
  "7": "bg-gradient-to-r from-pink-500 to-rose-500 text-white",
  "8": "bg-gradient-to-r from-cyan-500 to-blue-500 text-white",
};

function PlayerSearch() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [clusterFilter, setClusterFilter] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  useEffect(() => {
    fetch("/data/cluster_results.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setResults(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat data pemain:", err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    setCurrentPage(1);

    const filtered = data.filter(
      (p) =>
        p.player_name.toLowerCase().includes(value) &&
        (clusterFilter === "" || p.cluster === parseInt(clusterFilter))
    );
    setResults(filtered);
  };

  const handleClusterChange = (e) => {
    const value = e.target.value;
    setClusterFilter(value);
    setCurrentPage(1);

    const filtered = data.filter(
      (p) =>
        p.player_name.toLowerCase().includes(query.toLowerCase()) &&
        (value === "" || p.cluster === parseInt(value))
    );
    setResults(filtered);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentResults = results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    let pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage > 1)
      pages.push(
        <button
          key="prev"
          onClick={() => paginate(currentPage - 1)}
          className="px-3 py-2 rounded-lg bg-white border border-green-200 hover:bg-green-50 hover:border-green-400 text-green-700 font-medium transition-all duration-200 shadow-sm hover:shadow"
        >
          ←
        </button>
      );

    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => paginate(1)}
          className="px-3 py-2 rounded-lg bg-white border border-green-200 text-green-700 hover:bg-green-50 hover:border-green-400 font-medium transition-all duration-200 shadow-sm hover:shadow"
        >
          1
        </button>
      );
      if (startPage > 2) pages.push(<span key="dots1" className="px-2 text-gray-400">•••</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
            currentPage === i
              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md scale-105"
              : "bg-white border border-green-200 text-green-700 hover:bg-green-50 hover:border-green-400 shadow-sm hover:shadow"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push(<span key="dots2" className="px-2 text-gray-400">•••</span>);
      pages.push(
        <button
          key={totalPages}
          onClick={() => paginate(totalPages)}
          className="px-3 py-2 rounded-lg bg-white border border-green-200 text-green-700 hover:bg-green-50 hover:border-green-400 font-medium transition-all duration-200 shadow-sm hover:shadow"
        >
          {totalPages}
        </button>
      );
    }

    if (currentPage < totalPages)
      pages.push(
        <button
          key="next"
          onClick={() => paginate(currentPage + 1)}
          className="px-3 py-2 rounded-lg bg-white border border-green-200 hover:bg-green-50 hover:border-green-400 text-green-700 font-medium transition-all duration-200 shadow-sm hover:shadow"
        >
          →
        </button>
      );

    return <div className="flex gap-2 justify-center mt-8 flex-wrap">{pages}</div>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 pt-24 px-4 pb-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl shadow-lg mb-4">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
            Pencarian Pemain
          </h1>
          <p className="text-gray-600 text-lg">Temukan pemain berdasarkan nama atau cluster</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-green-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Pemain</p>
                <p className="text-2xl font-bold text-gray-800">{data.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-md border border-green-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Filter className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Hasil Filter</p>
                <p className="text-2xl font-bold text-gray-800">{results.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={clusterFilter}
                onChange={handleClusterChange}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none transition-all duration-200 bg-gray-50 hover:bg-white font-medium text-gray-700"
              >
                <option value="">Semua Cluster</option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i - 1} value={i - 1}>
                    Cluster {i - 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama pemain..."
                value={query}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-400 focus:outline-none transition-all duration-200 bg-gray-50 hover:bg-white font-medium text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {!loading && currentResults.length > 0 ? (
          <div className="space-y-3">
            {currentResults.map((player, i) => (
              <Link
                key={i}
                to={`/player/${encodeURIComponent(player.player_name)}`}
                className="block group"
              >
                <div className="bg-white rounded-xl p-5 border-2 border-transparent hover:border-green-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <h2 className="font-bold text-lg text-gray-800 group-hover:text-green-600 transition-colors mb-2">
                        {player.player_name}
                      </h2>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold shadow-md ${clusterColors[player.cluster]}`}
                      >
                        Cluster {player.cluster}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                        <span className="text-gray-500 font-medium">PC1:</span>{" "}
                        <span className="font-bold text-gray-700">{player.PC1.toFixed(2)}</span>
                      </div>
                      <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                        <span className="text-gray-500 font-medium">PC2:</span>{" "}
                        <span className="font-bold text-gray-700">{player.PC2.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {totalPages > 1 && renderPagination()}
          </div>
        ) : !loading && results.length === 0 && (query || clusterFilter) ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium">Tidak ada pemain yang ditemukan</p>
            <p className="text-gray-400 text-sm mt-2">Coba ubah kata kunci atau filter pencarian</p>
          </div>
        ) : (
          !loading && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-green-500" />
              </div>
              <p className="text-gray-600 text-lg font-medium">Mulai pencarian Anda</p>
              <p className="text-gray-400 text-sm mt-2">Gunakan filter cluster atau ketik nama pemain</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default PlayerSearch;