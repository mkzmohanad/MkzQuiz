const errorHandler = require("../Utils/errorHandler");

function handleDuplicationError(error) {
    console.log(error)
    return new errorHandler(`${error.errorResponse.errmsg} duplication error at ${error.errorResponse.errmsg.match(/(["'])(\\?.)*?\1/)[0]}` , 400);
}

function handleCastError(error) {
    return new errorHandler(`Invalid URL path ${error.path} of the value of {${error.value}}` , 404)
}

function handleValidationError(error) {
    const allErrors = Object.values(error.errors).map(el => el.message);

    return new errorHandler(`Invalid input data: ${allErrors.join(" & ")}` , 400)
}

function handleJsonWebTokenError() {
    return new errorHandler(`Invalid token please log in again` , 401)
}

function handleTokenExpiredError() {
    return new errorHandler(`Token is expired, please log in again` , 401)
}

function handleProductionError(error , res) {
    if(error.isOperationalError) {
        res.status(error.statusCode).json({
            status : error.status,
            message : error.message
        })
    }
    else{
        res.status(500).json({
            status:"error",
            message : "something went wrong, an unexpected error occurred!!!"
        })
    }
}

function handleDevelopmentError(err , res) {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    })
}

exports.globalErrorHandler = (err , req , res , next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "fail";

    if(process.env.NODE_ENV === "development") handleDevelopmentError(err , res)
    else if(process.env.NODE_ENV === "production")  {
        let error = {...err , message: err.message};
        if(err.code === 11000) error = handleDuplicationError(error);
        if(err.name === "CastError") error = handleCastError(error);
        if(err.name === "ValidationError") error = handleValidationError(error);
        if(err.name  === "JsonWebTokenError") error = handleJsonWebTokenError();
        if(err.name  === "TokenExpiredError") error = handleTokenExpiredError();
        
        handleProductionError(error , res)
    }
}