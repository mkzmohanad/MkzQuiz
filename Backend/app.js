const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const session = require('express-session');

const userRoutes = require("./Routes/UserRoutes");
const questionRoutes = require("./Routes/QuestionRoutes");
const errorHandler = require('./Utils/errorHandler');
const { globalErrorHandler } = require('./Controllers/ErrorController');
const settingsRoutes = require('./Routes/SettingsRoutes');

const app = express();

const corsOptions = {
    origin: ['http://localhost:5173'], // Your frontend origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cookieParser());
app.use(cors(corsOptions))
app.use(bodyParser.json());

// app.use(session({
//     secret : process.env.JWT_COOKIES_SECRET_KEY,
//     resave : false,
//     saveUninitialized : false,
    
// }))
// DON'T FORGET TO DELETE THE EXPRESS-SESSION IF U DIDN'T USE IT

console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === 'development') console.log("in development mode");
if(process.env.NODE_ENV === 'production') console.log("in production mode");

app.use("/api/v1/users" , userRoutes);
app.use("/api/v1/questions" , questionRoutes);
app.use("/api/v1/settings" , settingsRoutes)



app.all("*" , (req , res , next) => {
    next(new errorHandler(`the following url ${req.originalUrl} is not a valid url please enter an existing url` , 404))
})

app.use(globalErrorHandler)


module.exports = app;