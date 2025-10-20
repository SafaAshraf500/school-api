const globalError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (err.name === "ValidationError") {
        message = Object.values(err.errors).map(val => val.message).join(", ");
    }

    if (err.name === "JsonWebTokenError") {
        message = "Invalid Token. Please login again.";
    }

    if (err.name === "TokenExpiredError") {
        message = "Token expired. Please login again.";
    }

    if (err.code === "LIMIT_FILE_SIZE") {
        message = "File is too large.";
    }

    if (err.code === "LIMIT_UNEXPECTED_FILE") {
        message = "Unexpected file field.";
    }

    res.status(statusCode).json({
        success: false,
        message
    });
};
module.exports=globalError