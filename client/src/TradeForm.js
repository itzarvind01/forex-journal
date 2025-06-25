import React, { useState, useEffect } from 'react';

const initialState = {
  symbol: '',
  entryPrice: '',
  exitPrice: '',
  lotSize: '',
  result: '',
  comment: '',
  category: 'forex', // Default category
};

const TradeForm = ({ userId, onTradeAdded, editingTrade, onEditComplete }) => {
  const [trade, setTrade] = useState(editingTrade || initialState);

  useEffect(() => {
    if (editingTrade) {
      setTrade(editingTrade);
    } else {
      setTrade(initialState);
    }
  }, [editingTrade]);

  const handleChange = (e) => {
    setTrade({ ...trade, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingTrade ? 'PUT' : 'POST';
    const url = editingTrade
      ? `http://localhost:5000/api/trades/${editingTrade._id}`
      : 'http://localhost:5000/api/trades';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...trade, userId, date: new Date() }),
    });

    const data = await res.json();

    if (editingTrade) {
      onEditComplete(data); // update existing trade
    } else {
      onTradeAdded(data); // add new trade
    }

    setTrade(initialState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0f0f0f] text-white rounded-xl p-6 mb-6 shadow-lg border border-gray-800"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="symbol"
          placeholder="Symbol"
          onChange={handleChange}
          value={trade.symbol}
          required
          className="bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="entryPrice"
          placeholder="Entry Price"
          type="number"
          onChange={handleChange}
          value={trade.entryPrice}
          required
          className="bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="exitPrice"
          placeholder="Exit Price"
          type="number"
          onChange={handleChange}
          value={trade.exitPrice}
          required
          className="bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="lotSize"
          placeholder="Lot Size"
          type="number"
          onChange={handleChange}
          value={trade.lotSize}
          required
          className="bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="result"
          placeholder="Result (Win/Loss)"
          onChange={handleChange}
          value={trade.result}
          required
          className="bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          name="comment"
          placeholder="Comment"
          onChange={handleChange}
          value={trade.comment}
          className="bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <select
          name="category"
          onChange={handleChange}
          value={trade.category}
          required
          className="col-span-1 md:col-span-2 bg-gray-900 text-white px-4 py-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="forex">Forex</option>
          <option value="crypto">Crypto</option>
          <option value="metal">Metals</option>
          <option value="energy">Energy</option>
          <option value="index">Indices</option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-6 bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
      >
        {editingTrade ? 'Update Trade' : 'Add Trade'}
      </button>
    </form>
  );
};

export default TradeForm;
