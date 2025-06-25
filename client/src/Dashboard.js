import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = ({ trades }) => {
  if (trades.length === 0)
    return (
      <motion.p
        className="text-gray-400 text-center text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        No trades yet.
      </motion.p>
    );

  const wins = trades.filter((t) => t.result.toLowerCase() === 'win').length;
  const losses = trades.filter((t) => t.result.toLowerCase() === 'loss').length;
  const winRate = ((wins / trades.length) * 100).toFixed(2);
  const total = trades.length;
  const avgLot = (
    trades.reduce((sum, t) => sum + (parseFloat(t.lotSize) || 0), 0) / total
  ).toFixed(2);

  const cards = [
    {
      label: 'Total Trades',
      value: total,
      bg: 'from-purple-700 to-purple-900',
    },
    {
      label: 'Win Rate',
      value: `${winRate}%`,
      bg: 'from-green-600 to-green-800',
    },
    {
      label: 'Wins / Losses',
      value: `${wins} / ${losses}`,
      bg: 'from-red-600 to-red-800',
    },
    {
      label: 'Avg Lot Size',
      value: avgLot,
      bg: 'from-indigo-600 to-indigo-800',
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {cards.map((card, i) => (
        <motion.div
          key={i}
          className={`bg-gradient-to-br ${card.bg} text-white p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300`}
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-md font-semibold text-gray-200">{card.label}</h2>
          <p className="text-3xl font-bold mt-2">{card.value}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Dashboard;
