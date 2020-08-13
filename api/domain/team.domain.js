const aws = require("aws-sdk");
const camelcaseKeys = require('camelcase-keys');
let dynamodbConfig = require("../infrastructure/middleware/dynamodb-config");

class TeamDomain {



    async getListData(parameter, response) {
        var params =   {
            TableName: "Tournaments",
            KeyConditionExpression: "TournamentId = :tournamentId AND begins_with(SK, :teamPrefix)",
            ExpressionAttributeValues: {             
              ":tournamentId": "555",
              ":teamPrefix": "team-"
            }
          }
        try {
            let result = await dynamodbConfig("query", params);
            response.json({ teamList: camelcaseKeys(result.Items) })
        } catch (e) {
            response.json({ eroor: e })
        }
    }


    // async getListData(request, response) {
    //     var params = { TableName: "Tournaments" };
    //     try {
    //         let result = await dynamodbConfig("scan", params);
    //         response.json({ teamList: camelcaseKeys(result.Items) })
    //     } catch (e) {
    //         response.json({ eroor: e })
    //     }
    // }

    async getTeamDropdownData(request, response) {
        var params = {
            "TableName": "Tournaments",
            "ProjectionExpression" : "teamName" ,
         };
        try {
            let result = await dynamodbConfig("scan", params);         
            response.json({ teamList: camelcaseKeys(result.Items) })
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
            UpdateExpression: "SET teamName = :teamName,slogan = :slogan,ranks = :ranks,updatedOn=:updatedOn",
            ExpressionAttributeValues: {
                ":teamName": request.body.teamName,
                ":slogan": request.body.slogan,
                ":ranks": request.body.ranks,
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
        // var params = { TableName: "CaseInfos", Key: { teamName: parameter } };

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
module.exports = TeamDomain;