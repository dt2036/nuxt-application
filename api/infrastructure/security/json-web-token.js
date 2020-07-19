const jsonWebToken = require('jsonwebtoken');

class JsonWebToken {

    static getToken(claims) {
        let token = jsonWebToken.sign(
            claims,
            process.env.TOKEN_KEY, { expiresIn: process.env.EXPIRES_IN });
        return token;
    }

    static validate(token) {
        try {
            const claim = jsonWebToken.verify(token, process.env.TOKEN_KEY);
            return { isValid: true, claim: claim };
        } catch (ex) {
            console.log(ex)
            return false;
        }
    }
}
module.exports = JsonWebToken;