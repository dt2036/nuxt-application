const Joi = require('@hapi/joi');
module.exports = Joi.object({
    TournamentId: Joi.string().required(),
    SK: Joi.string().required(),
    sK: Joi.string().required(),
    sk: Joi.string().required(),
    playerName: Joi.string().min(3).max(10).required(),
    skill: Joi.string().min(1).max(10).required(),
    age: Joi.string().min(1).max(2).required(),
    teamName: Joi.string().required(),
    updatedOn: Joi.string().required(),
    tournamentId: Joi.string().required(),
})