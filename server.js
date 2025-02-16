require('dotenv').config(); // Load environment variables at the top

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB()
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Force HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// ✅ Add a test route to check if the backend is running
app.get('/', (req, res) => {
  res.send('Backend is running successfully 🚀');
});

// Routes
app.use('/api/businesses', require('./routes/businessRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// ✅ Use dynamic port for Render deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server started on port ${PORT}`));
