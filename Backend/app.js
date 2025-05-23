const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRoutes = require("./Routes/UserRoutes");
const questionRoutes = require("./Routes/QuestionRoutes");
const errorHandler = require('./Utils/errorHandler');
const { globalErrorHandler } = require('./Controllers/ErrorController');
const settingsRoutes = require('./Routes/SettingsRoutes');

const app = express();

const corsOptions = {
    origin: process.env.FRONTEND_LOCALHOST,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token", "headers"], // Add "headers"
    exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions))
app.options('*', cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());

app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Origin', "http://localhost:5173");
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return res.status(204).send();
    }
    next();
});

app.use("/api/v1/users" , userRoutes);
app.use("/api/v1/questions" , questionRoutes);
app.use("/api/v1/settings" , settingsRoutes)



app.all("*" , (req , res , next) => {
    next(new errorHandler(`the following url ${req.originalUrl} is not a valid url please enter an existing url` , 404))
})

// app.use((req, res, next) => {
//     console.log('Incoming request:', req.method, req.url);
//     res.on('finish', () => {
//         console.log('Response headers:', res.getHeaders());
//     });
//     next();
// });

app.use(globalErrorHandler)


module.exports = app;