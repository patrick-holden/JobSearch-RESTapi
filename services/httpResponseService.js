const httpResponse = (statusCode = 500, message = "Error", success = false, results = []) => {

    return {
        statusCode: statusCode,
        message: message,
        success: success,
        result: results
    }
}

module.exports = httpResponse;