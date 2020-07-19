var bouncer = require('express-bouncer')(500, 900000);
// give a custom error message

bouncer.blocked = function (req, res, next, remaining) {
    res.send(429, "Too many requests have been made. Please wait " + remaining / 1000 + " seconds.");
};

module.exports = bouncer;