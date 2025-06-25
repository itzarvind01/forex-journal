// TradeTable.js
import React from 'react';

const TradeTable = ({ trades, onDelete, onEdit }) => {
  return (
    <table className="w-full text-left bg-white text-black rounded overflow-hidden">
      <thead className="bg-purple-800 text-white">
        <tr>
          <th className="px-4 py-2">Symbol</th>
          <th>Entry</th>
          <th>Exit</th>
          <th>Lot</th>
          <th>Result</th>
          <th>Category</th>
          <th>Date</th>
          <th>Comment</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {trades.map((t) => (
          <tr key={t._id} className="border-t">
            <td className="px-4 py-2">{t.symbol}</td>
            <td>{t.entryPrice}</td>
            <td>{t.exitPrice}</td>
            <td>{t.lotSize}</td>
            <td>{t.result}</td>
            <td>{t.category || 'N/A'}</td>
            <td>{new Date(t.date).toLocaleDateString()}</td>
            <td>{t.comment}</td>
            <td className="flex gap-2">
              <button
                onClick={() => onEdit(t)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(t._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TradeTable;
