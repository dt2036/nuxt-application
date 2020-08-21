const JsonWebToken = require("../security/json-web-token");

const UNAUTHORIZED_MESSAGE = "UnAuthorized Access";
const API_PATH = "/api";
const BEARER = "Bearer ";
const { OAuth2Client } = require('google-auth-library');
const { validateGitHubToken, ValidationError } = require('validate-github-token');
//const CLIENT_ID = '357456209136-mrjmne1s18ptgsonv9rkkngpguf4im7p.apps.googleusercontent.com'
// const client = new OAuth2Client(CLIENT_ID);
const client = new OAuth2Client(
    '357456209136-mrjmne1s18ptgsonv9rkkngpguf4im7p.apps.googleusercontent.com',
    'DPfoe9-GB2zZMcXPkwHQ-QtW',
    'http://localhost:3000/auth/',
);

module.exports = function (unless) {
    return (request, response, next) => {
        var path = request.path;
        var origionalUrl = request.originalUrl;
        var isValid = true;
        // var isValid = false;
        const CLIENT_ID = '357456209136-mrjmne1s18ptgsonv9rkkngpguf4im7p.apps.googleusercontent.com'
        if (origionalUrl.indexOf(API_PATH) !== -1) {
            if (isAuthorizationCheck(path, unless)) {
                var cookies = parseCookies(request);
                function parseCookies(request) {
                    var list = [], rc = request.headers.cookie;
                    rc && rc.split(';').forEach(function (cookie) {
                        var parts = cookie.split('=');
                        list[parts.shift().trim()] = decodeURI(parts.join('='));
                    });
                    return list;
                }

                let strategy = cookies['auth.strategy'];


                if (request.headers.authorization) {
                    let token = request.headers.authorization.replace(BEARER, "");
                    // let token = request.headers.authorization;
                    // var result = JsonWebToken.validate(token);
                    // request.user = result.claim;
                    // isValid = result.isValid;

                    if (strategy == 'local') {
                        var result = JsonWebToken.validate(token);
                        request.user = result.claim;
                        isValid = result.isValid;
                    }
                    else if (strategy == 'google') {
                        client.setCredentials({ refresh_token: token });
                        async function verify() {
                            try {
                                const accessToken = await client.getAccessToken();
                                const ticket = await client.verifyIdToken({ idToken: accessToken.res.data.id_token, audience: CLIENT_ID });
                                const payload = ticket.getPayload();
                                isValid = payload.email_verified;
                            } catch (error) {
                                response.statusCode = 406;
                                response.send(UNAUTHORIZED_MESSAGE);
                            }
                        }
                        verify()
                    }
                    else {
                        async function verifyGitHubToken() {

                            let tempo = 'hfsfsjkgsgjhksgsjkg'
                            try {
                                const validated = await validateGitHubToken(
                                    token,
                                    {
                                        scope: {
                                            // Checks 'public_repo' scope is added to the token

                                        }
                                    }
                                );
                                console.log('Token scopes:', validated.scopes);
                                console.log('API rate limit remaining:', validated.rateLimit.remaining);
                                isValid = validated.rateLimit != undefined ? true : false
                            } catch (err) {
                               // isValid = false;
                                response.statusCode = 406;
                                response.send(UNAUTHORIZED_MESSAGE);
                            }
                        }
                        verifyGitHubToken()
                    }
                }
                else
                {
                    isValid = false;
                }
                 
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