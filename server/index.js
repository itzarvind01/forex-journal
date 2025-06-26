require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Enhanced Middleware
app.use(cors({
  origin: 'https://forex-journal-neon.vercel.app',
  credentials: true
}));

app.use(express.json({ limit: '10mb' })); // Increased payload limit
app.use(express.urlencoded({ extended: true }));

// Route imports
const tradeRoutes = require('./routes/trades');
app.use('/api/trades', tradeRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    dbState: mongoose.connection.readyState // 1 = connected, 0 = disconnected
  });
});

// Enhanced DB Connection
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB with URI:', 
      process.env.MONGO_URI.replace(/:[^@]+@/, ':*****@')); // Logs masked URI
    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Increased to 10 seconds
      socketTimeoutMS: 45000,
      retryWrites: true,
      w: 'majority'
    });

    mongoose.connection.on('error', err => {
      console.error('MongoDB runtime error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected!');
    });

    console.log('✅ MongoDB Connected');
    return true;
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    
    // Specific error handling
    if (err.name === 'MongoNetworkError') {
      console.error('Network error. Check your:');
      console.error('- Internet connection');
      console.error('- MongoDB Atlas IP whitelist');
      console.error('- Firewall settings');
    }
    
    process.exit(1);
  }
};

// Server Startup
const startServer = async () => {
  try {
    const dbConnected = await connectDB();
    if (!dbConnected) throw new Error('Failed to connect to DB');

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🟢 Health check at http://localhost:${PORT}/health`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        mongoose.connection.close(false, () => {
          console.log('MongoDB connection closed');
          process.exit(0);
        });
      });
    });

  } catch (err) {
    console.error('Fatal startup error:', err);
    process.exit(1);
  }
};

// Start the application
startServer();
