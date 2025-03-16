const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose'); // Still needed for health check
const connectDB = require('./config/database');
const { redisClient, connectRedis } = require('./config/redis');
const bookRoutes = require('./routes/bookRoutes');
// Assuming you'll create this error handler
const errorHandler = require('./controllers/middleware/errorHandler');

require('dotenv').config();

const app = express();

// Enhanced security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:"]
        }
    }
}));

// CORS configuration
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:3000', // Adjust based on your frontend port
            'http://127.0.0.1:5500'  // Live Server or other dev frontend
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Static files (optional, if you need to serve static assets)
app.use(express.static('public'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        redis: redisClient.isReady ? 'connected' : 'disconnected'
    });
});

// Routes
app.use('/api', bookRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server only after connections are established
const startServer = async () => {
    try {
        await connectDB();    // Connect to MongoDB (from config/database.js)
        await connectRedis(); // Connect to Redis (from config/redis.js)

        const PORT = process.env.PORT || 3000;
        const server = app.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
        });

        // Graceful shutdown
        const shutdown = async () => {
            console.log('🔻 Shutting down gracefully...');
            await redisClient.quit(); // Close Redis connection
            await mongoose.connection.close(); // Close MongoDB connection
            server.close(() => {
                console.log('💤 Server exited');
                process.exit(0);
            });
        };

        process.on('SIGINT', shutdown);           // Handle Ctrl+C
        process.on('SIGTERM', shutdown);          // Handle termination signals
        process.on('unhandledRejection', (err) => {
            console.error('❌ Unhandled Rejection:', err);
            shutdown();
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();