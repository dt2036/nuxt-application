const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
var errorhandler = require('errorhandler');
var cors = require('cors')

const authenticationMiddleware = require('../middleware/auth');
const tooBusy = require('../middleware/too-busy');
const dataSanitizer = require('../middleware/data-sanitizer');
const { jsonLimit, urlEncodedLimit, unAuthenticatedUris, xPoweredBy, development } = require("../../const/app.const");

module.exports = function (app) {
    app.use(cors());
    //app.use(tooBusy);
    app.disable(xPoweredBy);
    app.use(helmet());
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: false, limit: urlEncodedLimit }));
    app.use(bodyParser.json({ limit: jsonLimit }));
    app.use(authenticationMiddleware(unAuthenticatedUris));
    app.use(dataSanitizer);
    if (process.env.NODE_ENV === development) {
        // only use in development
        app.use(errorhandler());
    }
}