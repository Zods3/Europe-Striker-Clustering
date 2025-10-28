import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Users, Search, X, ArrowLeft, Repeat, Hourglass, Info } from "lucide-react";

// ===============================
// Color Mapping untuk Tema
// ===============================
const colorMap = {
  green: {
    primary: "#059669",
    light: "#10b981",
    lighter: "#6ee7b7",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    gradient: "from-emerald-500 to-teal-600",
  },
  blue: {
    primary: "#2563eb",
    light: "#3b82f6",
    lighter: "#60a5fa",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    gradient: "from-blue-500 to-cyan-600",
  },
};

// ===============================
// Component Utama
// ===============================
function PlayerDetail() {
  const { name } = useParams();
  const [player, setPlayer] = useState(null);
  const [biodata, setBiodata] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [comparePlayer, setComparePlayer] = useState(null);
  const [compareBio, setCompareBio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // 🆕 State untuk cluster detail popup
  const [showClusterDetail, setShowClusterDetail] = useState(false);
  const [clusterSummary, setClusterSummary] = useState([]);
  const [selectedClusterInfo, setSelectedClusterInfo] = useState(null);

  // ===============================
  // Fetch Data Awal
  // ===============================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clusterRes, bioRes, summaryRes] = await Promise.all([
          fetch(`${process.env.PUBLIC_URL}/Data/cluster_results.json`).then((res) => res.json()),
          fetch(`${process.env.PUBLIC_URL}/Data/player_biodata.json`).then((res) => res.json()),
          fetch(`${process.env.PUBLIC_URL}/Data/cluster_summary.json`).then((res) => res.json()), // 🆕 Tambah fetch cluster summary
        ]);

        setPlayers(bioRes);
        setClusterSummary(summaryRes); // 🆕 Set cluster summary
        const playerName = decodeURIComponent(name).toLowerCase();

        const playerCluster = clusterRes.find(
          (p) => p.player_name.toLowerCase() === playerName
        );
        const playerBio = bioRes.find(
          (p) => p.player_name.toLowerCase() === playerName
        );

        setPlayer(playerCluster || null);
        setBiodata(playerBio || null);
      } catch (err) {
        console.error("Gagal memuat data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  // ===============================
  // 🆕 Fungsi buka cluster detail
  // ===============================
  const handleClusterClick = (clusterId) => {
    const clusterInfo = clusterSummary.find((c) => c.cluster === clusterId);
    if (clusterInfo) {
      setSelectedClusterInfo(clusterInfo);
      setShowClusterDetail(true);
    }
  };

  // ===============================
  // Fungsi pilih pemain pembanding
  // ===============================
  const handleCompareSelect = async (secondName) => {
    setShowSearchModal(false);
    if (!secondName) return;

    const [clusterRes, bioRes] = await Promise.all([
      fetch(`${process.env.PUBLIC_URL}/Data/cluster_results.json`).then((res) => res.json()),
      fetch(`${process.env.PUBLIC_URL}/Data/player_biodata.json`).then((res) => res.json()),
    ]);

    const compareCluster = clusterRes.find(
      (p) => p.player_name.toLowerCase() === secondName.toLowerCase()
    );
    const compareBioData = bioRes.find(
      (p) => p.player_name.toLowerCase() === secondName.toLowerCase()
    );

    setComparePlayer(compareCluster || null);
    setCompareBio(compareBioData || null);
    setCompareMode(true);
  };

  // ===============================
  // 🧮 Fungsi pembanding nilai
  // ===============================
  const calculateBetter = (val1, val2, higherIsBetter = true) => {
    const num1 = parseFloat(val1) || 0;
    const num2 = parseFloat(val2) || 0;

    if (num1 === num2) return "draw";
    if (higherIsBetter) {
      return num1 > num2 ? "player1" : "player2";
    } else {
      return num1 < num2 ? "player1" : "player2";
    }
  };

  // ===============================
  // Komponen Grafik Goals vs Assists
  // ===============================
  const renderGoalsAssistChart = (bio, colorScheme = "green") => {
    if (!bio) return null;

    const data = [
      {
        season: "S1",
        Goals: bio.goals_season1 || 0,
        Assists: bio.assists_season1 || 0,
      },
      {
        season: "S2",
        Goals: bio.goals_season2 || 0,
        Assists: bio.assists_season2 || 0,
      },
      {
        season: "S3",
        Goals: bio.goals_season3 || 0,
        Assists: bio.assists_season3 || 0,
      },
      {
        season: "S4",
        Goals: bio.goals_season4 || 0,
        Assists: bio.assists_season4 || 0,
      },
      {
        season: "S5",
        Goals: bio.goals_season5 || 0,
        Assists: bio.assists_season5 || 0,
      },
    ];

    const colors = colorMap[colorScheme];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className={`w-5 h-5 ${colors.text}`} />
          <h3 className={`text-lg font-bold ${colors.text}`}>
            Performance Trend
          </h3>
        </div>

        <ResponsiveContainer width="100%" height={260}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`colorGoals${colorScheme}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.primary} stopOpacity={0.3} />
                <stop offset="95%" stopColor={colors.primary} stopOpacity={0} />
              </linearGradient>
              <linearGradient id={`colorAssists${colorScheme}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.lighter} stopOpacity={0.3} />
                <stop offset="95%" stopColor={colors.lighter} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="season" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="Goals"
              stroke={colors.primary}
              strokeWidth={3}
              fill={`url(#colorGoals${colorScheme})`}
            />
            <Area
              type="monotone"
              dataKey="Assists"
              stroke={colors.lighter}
              strokeWidth={3}
              fill={`url(#colorAssists${colorScheme})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    );
  };

  // ===============================
  // Komponen Stat Card Mini
  // ===============================
  const StatCard = ({ label, value, icon, colorScheme = "green" }) => {
    const colors = colorMap[colorScheme];
    return (
      <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {label}
          </span>
          {icon}
        </div>
        <p className={`text-2xl font-bold ${colors.text}`}>{value}</p>
      </div>
    );
  };

  // ===============================
  // Komponen Card Pemain
  // ===============================
  const renderPlayerCard = (data, bio, colorScheme = "green") => {
    const clusterLabel = data?.cluster ?? "Tidak diketahui";
    const lastYear = bio?.last_year_played || "N/A";
    const activeStatus =
      lastYear >= 2024
        ? "✓ Active in Europe"
        : `Last played in Europe ${lastYear}`;

    const colors = colorMap[colorScheme];

    const contributions = bio?.total_goals && bio?.total_assists
      ? bio.total_goals + bio.total_assists
      : 0;

    const goalsPerMatch =
      bio?.total_matches > 0
        ? (bio.total_goals / bio.total_matches).toFixed(2)
        : "0.00";
    const assistsPerMatch =
      bio?.total_matches > 0
        ? (bio.total_assists / bio.total_matches).toFixed(2)
        : "0.00";
    const minutesPerMatch =
      bio?.total_matches > 0
        ? Math.round(bio.total_minutes / bio.total_matches)
        : 0;

    const starter = bio?.starter_percentage || 0;
    const sub = bio?.substitute_percentage || 0;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        {/* Header Card */}
        <div className={`bg-gradient-to-r ${colors.gradient} rounded-2xl shadow-xl p-8 text-white mb-6`}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl font-extrabold mb-2">
                {bio?.player_name || data?.player_name}
              </h1>
              <div className="flex items-center gap-2 text-sm bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 w-fit">
                <span>{activeStatus}</span>
              </div>
            </div>
            {/* 🆕 Cluster badge dengan button untuk detail */}
            <button
              onClick={() => handleClusterClick(data?.cluster)}
              className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 hover:bg-white/30 transition-all transform hover:scale-105 active:scale-95 group cursor-pointer"
              title="Click to see cluster details"
            >
              <div className="flex items-center gap-2">
                <div>
                  <p className="text-xs opacity-80">Cluster</p>
                  <p className="text-2xl font-bold">{clusterLabel}</p>
                </div>
                <Info className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs opacity-80 mb-1">Country</p>
              <p className="font-semibold">{bio?.country_of_citizenship || "-"}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs opacity-80 mb-1">Club</p>
              <p className="font-semibold">{bio?.club_name || "-"}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs opacity-80 mb-1">Age</p>
              <p className="font-semibold">{bio?.age || "-"} years</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <p className="text-xs opacity-80 mb-1">Position</p>
              <p className="font-semibold">{bio?.sub_position || "-"}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Total Goals"
            value={bio?.total_goals || 0}
            icon={<Trophy className={`w-5 h-5 ${colors.text}`} />}
            colorScheme={colorScheme}
          />
          <StatCard
            label="Total Assists"
            value={bio?.total_assists || 0}
            icon={<Users className={`w-5 h-5 ${colors.text}`} />}
            colorScheme={colorScheme}
          />
          <StatCard
            label="Matches"
            value={bio?.total_matches || 0}
            icon={<TrendingUp className={`w-5 h-5 ${colors.text}`} />}
            colorScheme={colorScheme}
          />
          <StatCard
            label="Minutes"
            value={bio?.total_minutes || 0}
            icon={<Hourglass className={`w-5 h-5 ${colors.text}`} />}
            colorScheme={colorScheme}
          />
          <StatCard
            label="Contributions"
            value={contributions}
            colorScheme={colorScheme}
          />
          <StatCard
            label="Goals/Match"
            value={goalsPerMatch}
            colorScheme={colorScheme}
          />
          <StatCard
            label="Assists/Match"
            value={assistsPerMatch}
            colorScheme={colorScheme}
          />
          <StatCard
            label="Minutes/Match"
            value={minutesPerMatch}
            colorScheme={colorScheme}
          />
        </div>

        {/* Playing Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6"
        >
          <h3 className={`text-lg font-bold mb-4 ${colors.text}`}>
            Playing Time Distribution
          </h3>
          <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${starter}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`absolute left-0 top-0 h-full bg-gradient-to-r ${colors.gradient}`}
            />
          </div>
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors.gradient}`}></div>
              <span className="text-sm font-medium text-gray-700">
                Starter: {starter.toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-sm font-medium text-gray-700">
                Substitute: {sub.toFixed(1)}%
              </span>
            </div>
          </div>
        </motion.div>

        {/* Chart */}
        {renderGoalsAssistChart(bio, colorScheme)}

        {/* PCA Values */}
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mt-6"
          >
            <h3 className={`text-lg font-bold mb-4 ${colors.text}`}>
              PCA Components
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">PC1</p>
                <p className="text-xl font-bold text-gray-800">{data.PC1.toFixed(3)}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">PC2</p>
                <p className="text-xl font-bold text-gray-800">{data.PC2.toFixed(3)}</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">PC3</p>
                <p className="text-xl font-bold text-gray-800">{data.PC3.toFixed(3)}</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  };

  // ===============================
  // Comparison Table
  // ===============================
  const renderComparisonTable = () => {
    if (!compareMode || !player || !comparePlayer || !biodata || !compareBio)
      return null;

    const stats = [
      { label: "Total Goals", key: "total_goals" },
      { label: "Total Assists", key: "total_assists" },
      { label: "Total Matches", key: "total_matches" },
      { label: "Total Minutes", key: "total_minutes" },
      { label: "Age", key: "age" },
      { label: "Cluster", key: null, p1: player.cluster, p2: comparePlayer.cluster },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="col-span-2 bg-white rounded-2xl shadow-xl p-8 mt-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Head-to-Head Comparison
        </h2>

        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gradient-to-r from-emerald-50 via-white to-blue-50">
                <th className="p-4 text-left font-bold text-emerald-700 w-[35%]">
                  {biodata.player_name}
                </th>
                <th className="p-4 text-center font-bold text-gray-600 w-[30%]">Metric</th>
                <th className="p-4 text-right font-bold text-blue-700 w-[35%]">
                  {compareBio.player_name}
                </th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat, idx) => {
                const val1 = stat.key ? biodata[stat.key] || 0 : stat.p1;
                const val2 = stat.key ? compareBio[stat.key] || 0 : stat.p2;
                const better =
                  stat.key === null
                    ? "draw"
                    : stat.key !== "age"
                    ? calculateBetter(val1, val2, true)
                    : calculateBetter(val1, val2, false);

                const rowClass =
                  stat.key === null
                    ? "bg-white"
                    : better === "player1"
                    ? "bg-gradient-to-r from-emerald-50 to-white"
                    : better === "player2"
                    ? "bg-gradient-to-l from-blue-50 to-white"
                    : "bg-white";

                return (
                  <tr
                    key={idx}
                    className={`border-b border-gray-100 hover:shadow-md transition-shadow ${rowClass}`}
                  >
                    <td className="p-4 text-left font-semibold text-emerald-700">
                      {better === "player1" && stat.key !== null && (
                        <Trophy className="w-4 h-4 inline mr-2 text-emerald-600" />
                      )}
                      {typeof val1 === "number" && stat.key !== "age" && stat.key !== null
                        ? val1.toLocaleString()
                        : val1}
                    </td>
                    <td className="p-4 text-center text-gray-600 font-medium">
                      {stat.label}
                    </td>
                    <td className="p-4 text-right font-semibold text-blue-700">
                      {typeof val2 === "number" && stat.key !== "age" && stat.key !== null
                        ? val2.toLocaleString()
                        : val2}
                      {better === "player2" && stat.key !== null && (
                        <Trophy className="w-4 h-4 inline ml-2 text-blue-600" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Cluster Similarity */}
        {player && comparePlayer && (
          <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
            <p className="text-center text-gray-700 font-medium">
              Cluster Similarity:{" "}
              {player.cluster === comparePlayer.cluster ? (
                <span className="text-emerald-600 font-bold">
                  Same Cluster - Very Similar Playing Style
                </span>
              ) : (
                <span className="text-orange-600 font-bold">
                  Different Clusters - Distinct Playing Styles
                </span>
              )}
            </p>
          </div>
        )}
      </motion.div>
    );
  };

  // ===============================
  // Loading
  // ===============================
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading player data...</p>
        </div>
      </div>
    );

  // ===============================
  // Render Utama
  // ===============================
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 pt-24 px-4 md:px-6 pb-10">
      {!compareMode ? (
        <div className="w-full max-w-4xl mx-auto">
          {renderPlayerCard(player, biodata, "green")}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSearchModal(true)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold"
            >
              <Repeat className="w-5 h-5" />
              Compare with Another Player
            </motion.button>
            
            <Link to="/search">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Search
              </motion.button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {renderPlayerCard(player, biodata, "green")}
            {renderPlayerCard(comparePlayer, compareBio, "blue")}
          </div>
          
          <div className="grid grid-cols-1">
            {renderComparisonTable()}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowSearchModal(true)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold"
            >
              <Repeat className="w-5 h-5" />
              Compare with Different Player
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCompareMode(false)}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Single View
            </motion.button>
          </div>
        </div>
      )}

      {/* 🆕 Modal Cluster Detail */}
      {showClusterDetail && selectedClusterInfo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowClusterDetail(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header dengan gradient */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-extrabold mb-1">
                    Cluster {selectedClusterInfo.cluster}
                  </h2>
                  <p className="text-lg opacity-90">
                    {selectedClusterInfo.label}
                  </p>
                </div>
                <button
                  onClick={() => setShowClusterDetail(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-8">
              {/* Render HTML dari full_analysis */}
              <div
                className="prose prose-sm max-w-none 
                  prose-headings:text-indigo-700 
                  prose-headings:font-bold 
                  prose-strong:text-indigo-600
                  prose-li:text-gray-700
                  leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html:
                    selectedClusterInfo.full_analysis ||
                    "Analisis lengkap belum tersedia untuk cluster ini.",
                }}
              />
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowClusterDetail(false)}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                ✖️ Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Modal Pencarian Pemain */}
      {showSearchModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowSearchModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Select Player to Compare
              </h2>
              <button
                onClick={() => setShowSearchModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            
            <div className="relative mb-4">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Type player name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            
            <div className="max-h-80 overflow-y-auto space-y-2 custom-scrollbar">
              {players
                .filter((p) =>
                  p.player_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
                )
                .slice(0, 20)
                .map((p, idx) => (
                  <motion.button
                    key={p.player_name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-emerald-50 text-gray-700 font-medium transition-all border border-transparent hover:border-blue-200"
                    onClick={() => handleCompareSelect(p.player_name)}
                  >
                    {p.player_name}
                  </motion.button>
                ))}
              {players.filter((p) =>
                p.player_name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              ).length === 0 && (
                <p className="text-gray-400 text-center py-8 text-sm">
                  No players found matching your search.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </div>
  );
}

export default PlayerDetail;