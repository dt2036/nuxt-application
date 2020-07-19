var toobusy = require('toobusy-js');
module.exports = function (req, res, next) {
    if (toobusy()) {
        // log if you see necessary
        res.status(503).send("Server Too Busy");
    } else {
        next();
    }
}