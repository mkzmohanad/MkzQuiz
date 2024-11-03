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
    origin: "https://mkz-quiz-frontend-drab.vercel.app", // Your frontend origin
    methods : ['GET', 'POST', 'PATCH' , 'DELETE'],
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions))
app.options('*', cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());

// if(process.env.NODE_ENV === 'development') console.log("in development mode");
// if(process.env.NODE_ENV === 'production') console.log("in production mode");

app.use("/api/v1/users" , userRoutes);
app.use("/api/v1/questions" , questionRoutes);
app.use("/api/v1/settings" , settingsRoutes)



app.all("*" , (req , res , next) => {
    next(new errorHandler(`the following url ${req.originalUrl} is not a valid url please enter an existing url` , 404))
})

app.use(globalErrorHandler)


module.exports = app;