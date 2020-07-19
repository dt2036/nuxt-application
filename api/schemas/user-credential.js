const Joi = require('@hapi/joi');
module.exports = Joi.object({
    username: Joi.string().min(3).max(10).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})