// App.js\
import StarryBackground from './StarryBackground';
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TradeForm from "./TradeForm";
import TradeTable from "./TradeTable";
import Dashboard from "./Dashboard";
import ExportCSV from "./ExportCSV";
import { useAuth } from "./AuthContext";

function App() {
  const [filter, setFilter] = useState("all");
  const { user, login, logout } = useAuth();
  const darkMode = true;
  const [trades, setTrades] = useState([]);
  const [editingTrade, setEditingTrade] = useState(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const fetchTrades = async () => {
      if (!user) return;
      const url = `https://forex-journal-c4ie.onrender.com/api/trades/${user.uid}${
        filter !== "all" ? `?category=${filter}` : ""
      }`;
      const res = await fetch(url);
      const data = await res.json();
      setTrades(data);
    };

    fetchTrades();
  }, [user, filter]);

  const handleAddTrade = (newTrade) => {
    if (filter === "all" || newTrade.category === filter) {
      setTrades([...trades, newTrade]);
    }
  };

  const handleEditTrade = (updatedTrade) => {
    setTrades(
      trades.map((t) => (t._id === updatedTrade._id ? updatedTrade : t))
    );
    setEditingTrade(null);
  };

  const handleDelete = async (id) => {
    await fetch(`https://forex-journal-c4ie.onrender.com/api/trades/${id}`, { method: "DELETE" });
    setTrades(trades.filter((t) => t._id !== id));
  };

  return (
    <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 shadow-lg">
      <div className="relative min-h-screen overflow-hidden text-white">
        <StarryBackground isDark={true} />
        <div className="relative z-10 p-4">
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-purple-800 via-indigo-700 to-blue-600 p-5 rounded-xl shadow-lg mb-6 flex justify-between items-center">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-purple-200 via-white to-indigo-300 drop-shadow-xl"
              style={{
                WebkitTextStroke: "0.7px rgba(255,255,255,0.8)",
                textShadow: `
      0 2px 4px rgba(0, 0, 0, 0.3),
      0 4px 12px rgba(255, 255, 255, 0.15),
      0 0 20px rgba(168, 85, 247, 0.4)
    `,
              }}
            >
              Trading Journal
            </motion.h1>

            <div className="flex gap-2 items-center">
              {user ? (
                <>
                  <span className="text-sm text-white">
                    Welcome, {user.displayName}
                  </span>
                  <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={login}
                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-sm"
                >
                  Login with Google
                </button>
              )}
            </div>
          </div>

          {/* Filter Dropdown */}
          {user && (
            <div className="mb-4">
              <select
                className="bg-gray-800 text-white px-4 py-2 rounded"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="forex">Forex</option>
                <option value="crypto">Crypto</option>
                <option value="metal">Metals</option>
                <option value="energy">Energy</option>
                <option value="index">Indices</option>
              </select>
            </div>
          )}

          {/* Main Content */}
          {user ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              <ExportCSV trades={trades} />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Dashboard trades={trades} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <TradeForm
                  userId={user.uid}
                  onTradeAdded={handleAddTrade}
                  editingTrade={editingTrade}
                  onEditComplete={handleEditTrade}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <TradeTable
                  trades={trades}
                  onDelete={handleDelete}
                  onEdit={setEditingTrade}
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.p
              className="text-center mt-24 text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Please login to manage your journal.
            </motion.p>
          )}
          <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-16 text-center"
          >
            <p className="text-lg sm:text-xl font-extrabold tracking-tight text-gray-800 dark:text-white">
              Made with{" "}
              <span className="text-red-500 text-2xl animate-pulse">❤️</span> by{" "}
              <span className="bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent">
                Arbind Pattnaik
              </span>
            </p>

            <a
              href="mailto:arbindpattnaik1@gmail.com"
              className="mt-3 inline-block px-5 py-2 rounded-full text-sm font-semibold text-white backdrop-blur-sm bg-purple-500/10 hover:bg-purple-500/20 border border-purple-400 transition-all duration-300"
            >
              Contact Us
            </a>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}

export default App;
