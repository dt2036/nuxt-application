
module.exports = function (schema) {
    return (request, response, next) => {
        const { error } = schema.validate(request.body);
        if (error) {
            response.statusCode = 400;
            response.send("Invalid data");
        } else
            next();
    }
}

