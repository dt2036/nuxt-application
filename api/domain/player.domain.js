const aws = require("aws-sdk");
const camelcaseKeys = require('camelcase-keys');
let dynamodbConfig = require("../infrastructure/middleware/dynamodb-config");

class PlayerDomain {
    async getListData(parameter, response) {
        var params = {
            TableName: "Tournaments",
            KeyConditionExpression: "TournamentId = :tournamentId AND begins_with(SK, :teamPrefix)",
            ExpressionAttributeValues: {
                ":tournamentId": "555",
                ":teamPrefix": "player-"
            }
        }
        try {
            let result = await dynamodbConfig("query", params);
            response.json({ playerList: camelcaseKeys(result.Items) })
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
            response.json({ playerData: camelcaseKeys(result.Items[0]) })
        } catch (e) {
            response.json({ eroor: e })
        }
    }

    async getFilterData(request, response) {
        // var params = { TableName: "Tournaments", Item: request.body };
        var params = {
            "TableName": "Tournaments",
            // "KeyConditionExpression": "TournamentId = :tournamentId AND begins_with(SK, :teamPrefix)",
            "FilterExpression": "teamName = :teamName AND begins_with(SK, :teamPrefix)",
            "ExpressionAttributeValues": {
                ":teamName": request.body.teamName,
                ":teamPrefix": "player-"
            }
        };
        try {
            let result = await dynamodbConfig("scan", params);
            response.json({ playerList: camelcaseKeys(result.Items) })
        } catch (e) {
            response.json({ eroor: e })
        }
    }

    async createCase(request, response) {
        var params = { TableName: "Tournaments", Item: request.body };
        try {
            let result = await dynamodbConfig("put", params);
            response.json("Player added.");
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
            UpdateExpression: "SET teamName = :teamName,playerName = :playerName,skill = :skill,age = :age,updatedOn=:updatedOn",
            ExpressionAttributeValues: {
                ":teamName": request.body.teamName,
                ":playerName": request.body.playerName,
                ":skill": request.body.skill,
                ":age": request.body.age,
                ":updatedOn": request.body.updatedOn,
            },
            ReturnValues: "UPDATED_NEW"
        }
        try {
            let result = await dynamodbConfig("update", params);
            response.json("Player Updated.");
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
        try {
            let result = await dynamodbConfig("delete", params);
            response.json("Data deleted.");
        } catch (e) {
            response.json({ eroor: e })
        }
    }
}
module.exports = PlayerDomain;