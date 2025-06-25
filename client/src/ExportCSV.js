import React from 'react';

const ExportCSV = ({ trades }) => {
  const downloadCSV = () => {
    const headers = ['Symbol', 'Entry', 'Exit', 'Lot', 'Result', 'Date', 'Comment'];
    const rows = trades.map(t => [
      t.symbol, t.entryPrice, t.exitPrice, t.lotSize, t.result,
      new Date(t.date).toLocaleDateString(), t.comment
    ]);

    let csvContent = "data:text/csv;charset=utf-8,"
      + [headers, ...rows].map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "trades.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <button onClick={downloadCSV} className="bg-yellow-500 text-black px-4 py-2 rounded mb-4">
      Download CSV
    </button>
  );
};

export default ExportCSV;
