const JsonWebToken = require("../security/json-web-token");

const UNAUTHORIZED_MESSAGE = "UnAuthorized Access";
const API_PATH = "/api";
const BEARER = "Bearer ";

module.exports = function (unless) {
    return (request, response, next) => {
        var path = request.path;
        var origionalUrl = request.originalUrl;
        var isValid = true;
        if (origionalUrl.indexOf(API_PATH) !== -1) {
            if (isAuthorizationCheck(path, unless)) {
                if (request.headers.authorization) {
                    let token = request.headers.authorization.replace(BEARER, "");
                    var result = JsonWebToken.validate(token);
                    request.user = result.claim;
                    isValid = result.isValid;
                }
                else
                    isValid = false;
            }
            if (!isValid) {
                response.statusCode = 406;
                response.send(UNAUTHORIZED_MESSAGE);
            } else
                next();
        } else
            next();
        
    };
}
function isAuthorizationCheck(path, unless) {
    var isAuthorize = true;
    for (var i = 0; i < unless.length; i++) {
        if (path.indexOf(unless[i]) !== -1)
            isAuthorize = false;
    }
    return isAuthorize;
}