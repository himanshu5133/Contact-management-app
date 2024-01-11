const { constants } = require('../constants/constants');
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation failed",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: "Forbidden error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: "not fount",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: "user not authorized",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.SERVER_ERROR:
            res.json({
                title: "server error",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            console.log("No Error");
            break;

    }


    res.json({ message: err.message, stackTrace: err.stack });
};

module.exports = errorHandler;