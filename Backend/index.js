const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
    process.exit(1)
})

dotenv.config({path : "./config.env"});
const app = require("./app");

const DATABASE = process.env.DATABASE.replace("<DB_PASSWORD>" , process.env.DATABASE_PASSWORD);

mongoose.connect(DATABASE)

const port = process.env.PORT;
const server = app.listen(port , () => {console.log("good")});

process.on("unhandledRejection" , err => {
    server.close(() => {
        process.exit(1)
    })
})