const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
    process.exit(1)
})

dotenv.config({path : "./config.env"});
const app = require("./app");

// const mongoose = require('mongoose');

let isConnected = false; // Global connection state

const connectDB = async () => {
    if (isConnected) {
        console.log('Using existing database connection...');
        return;
    }

    try {
        const DB = process.env.DATABASE_STRING.replace(
            '<db_password>',
            process.env.DATABASE_password
        );

        const db = await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout if no connection
            socketTimeoutMS: 45000,         // Close sockets after 45 seconds
            keepAlive: true,
            keepAliveInitialDelay: 300000   // 5 minutes
        });

        isConnected = db.connections[0].readyState === 1;
        console.log('Connected to database...');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
