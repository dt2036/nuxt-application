const aws = require("aws-sdk");
const camelcaseKeys = require('camelcase-keys');
let dynamodbConfig = require("../infrastructure/middleware/dynamodb-config");

class MatchDomain {

    async getListData(parameter, response) {
        // var params = { TableName: "Tournaments" };

        var params = {
            TableName: "Tournaments",
            KeyConditionExpression: "TournamentId = :tournamentId AND begins_with(SK, :teamPrefix)",
            ExpressionAttributeValues: {
                ":tournamentId": "555",
                ":teamPrefix": "match-"
            }
        }

        try {
            let result = await dynamodbConfig("query", params);
            response.json({ matchList: camelcaseKeys(result.Items) })
        } catch (e) {
            response.json({ eroor: e })
        }
    }

    async getByIdData(parameter, response) {

        var params = {
            TableName: "Tournaments",
            KeyConditionExpression: "TournamentId = :a AND SK = :b",
            ExpressionAttributeValues: {
                ":a": parameter.tournamentId,
                ":b": parameter.sk
            }
        }
        try {
            let result = await dynamodbConfig("query", params);
            response.json({ teamData: camelcaseKeys(result.Items[0]) })
        } catch (e) {
            response.json({ eroor: e })
        }
    }

    async createCase(request, response) {
        var params = { TableName: "Tournaments", Item: request.body };
        try {
            let result = await dynamodbConfig("put", params);
            response.json("Team added.");
        } catch (e) {
            response.json({ eroor: e })
        }
    }

    async updateCase(request, response) {
        var params = {
            TableName: "Tournaments",
            Key: {
                "TournamentId": "555",
                "SK": request.body.sk
            },
            UpdateExpression: "SET teamA = :teamA,teamB = :teamB,ticketSold = :ticketSold,updatedOn=:updatedOn",
            ExpressionAttributeValues: {
                ":teamA": request.body.teamA,
                ":teamB": request.body.teamB,
                ":ticketSold": request.body.ticketSold,
                ":updatedOn": request.body.updatedOn,
            },
            ReturnValues: "UPDATED_NEW"
        }
        try {
            let result = await dynamodbConfig("update", params);
            response.json("Team Updated.");
        } catch (e) {
            response.json({ eroor: e })
        }
    }

    async deleteData(parameter, response) {
        var params = {
            TableName: "Tournaments",
            Key: {
                "TournamentId": "555",
                "SK": parameter
            }
        }

        // Key: { teamName: parameter } };
        try {
            let result = await dynamodbConfig("delete", params);
            response.json("Data deleted.");
        } catch (e) {
            response.json({ eroor: e })
        }
    }
}
module.exports = MatchDomain;