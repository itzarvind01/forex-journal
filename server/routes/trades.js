const express = require('express');
const router = express.Router();
const Trade = require('../models/trade');

// ✅ Get all trades for a user, with optional category filtering
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { category } = req.query;

    const query = { userId };
    if (category && category !== 'all') {
      query.category = category;
    }

    const trades = await Trade.find(query).sort({ createdAt: -1 });
    res.json(trades);
  } catch (err) {
    console.error('[GET /trades/:userId] Error:', err);
    res.status(500).json({ error: 'Failed to fetch trades' });
  }
});

// ✅ Add a new trade
router.post('/', async (req, res) => {
  try {
    const {
      userId,
      symbol,
      entryPrice,
      exitPrice,
      lotSize,
      result,
      comment,
      category,
      date
    } = req.body;

    if (!userId || !symbol || !entryPrice || !exitPrice || !lotSize || !result || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newTrade = new Trade({
      userId,
      symbol,
      entryPrice,
      exitPrice,
      lotSize,
      result,
      comment,
      category,
      date: date || new Date(),
    });

    const savedTrade = await newTrade.save();
    res.status(201).json(savedTrade);
  } catch (err) {
    console.error('[POST /trades] Error:', err);
    res.status(400).json({ error: 'Failed to save trade' });
  }
});

// ✅ Update a trade
router.put('/:id', async (req, res) => {
  try {
    const updated = await Trade.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('[PUT /trades/:id] Error:', err);
    res.status(400).json({ error: 'Failed to update trade' });
  }
});

// ✅ Delete a trade
router.delete('/:id', async (req, res) => {
  try {
    await Trade.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trade deleted' });
  } catch (err) {
    console.error('[DELETE /trades/:id] Error:', err);
    res.status(400).json({ error: 'Failed to delete trade' });
  }
});

module.exports = router;
