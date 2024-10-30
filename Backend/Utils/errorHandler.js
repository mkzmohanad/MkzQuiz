class errorHandler extends Error {
    constructor(message , statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "error" : "fail";
        this.isOperationalError = true;
        Error.captureStackTrace(this , this.constructor)
    }
} 

module.exports = errorHandler;
