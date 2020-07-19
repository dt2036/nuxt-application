var _ = require('underscore');
module.exports = function (request, response, next) {
    if (request.params && Object.keys(request.params).length > 0)
        request.params = sanitizeObject(request.params);
    if (request.query && Object.keys(request.query).length > 0)
        request.query = sanitizeObject(request.query);
    if (request.body && Object.keys(request.body).length > 0)
        request.body = sanitizeObject(request.body);
    next();
}

function sanitizeObject(jObject) {
    var newObject = {};
    for (var columnName in jObject) {
        if (Array.isArray(jObject[columnName]))
            jObject[columnName].forEach(t =>
                newObject[columnName].push(sanitizeObject(t))
            );
        else if (isObject(jObject[columnName]))
            newObject[columnName] = sanitizeObject(jObject[columnName]);
        else
            newObject[columnName] = sanitize(jObject[columnName]);
    }
    return newObject;
}

function sanitize(value) {
    if (typeof value == "string")
        value = _.escape(value);
    return value;
}
function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}

