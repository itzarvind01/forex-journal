const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Firebase UID
  symbol: { type: String, required: true },
  entryPrice: { type: Number, required: true },
  exitPrice: { type: Number, required: true },
  lotSize: { type: Number, required: true },
  result: { type: String, required: true },
  date: { type: Date, default: Date.now },
  comment: { type: String },
  category: { type: String, required: true } 
}, {
  timestamps: true
});

module.exports = mongoose.model('Trade', TradeSchema);
