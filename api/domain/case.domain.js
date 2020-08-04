const aws = require("aws-sdk");
const camelcaseKeys = require('camelcase-keys');
let dynamodbConfig = require("../infrastructure/middleware/dynamodb-config");

class CaseDomain {

    async getByIdData(parameter, response) {
        const dynamoDb = new aws.DynamoDB.DocumentClient({ region: "us-east-1" });
        try {
            var params = {
                TableName: "CaseInfos",
                Key: {
                    name: parameter

                }
            };
            var result = await dynamoDb.get(params).promise();
            response.json({ caseData: camelcaseKeys(result.Item) })
        } catch (error) {
            response.json(error);
            console.error(error);
        }
    }

    async getListData(request, response) {
        var params = { TableName: "CaseInfos" };
        try {
            let result = await dynamodbConfig("scan", params);
            response.json({ caseList: camelcaseKeys(result.Items) })
        } catch (e) {
            response.json({ eroor: e })
        }

        // const dynamoDb = new aws.DynamoDB.DocumentClient({ region: "us-east-1" });
        // try {
        //     var params = { TableName: "CaseInfos" };
        //     var result = await dynamoDb.scan(params).promise();
        //     response.json({ caseList: camelcaseKeys(result.Items) })
        // } catch (error) {
        //     response.json(error);
        //     console.error(error);
        // }
    }


    async createCase(request, response) {
        var params = { TableName: "CaseInfos", Item: request.body };
        try {
            let result = await dynamodbConfig("put", params);
            response.json("Data added.");
        } catch (e) {
            response.json({ eroor: e })
        }


        // const dynamoDb = new aws.DynamoDB.DocumentClient({ region: "us-east-1" });
        // var data1 = request.body;
        // var params = { TableName: "CaseInfos", Item: request.body };
        // await dynamoDb.put(params, function (err, data) {
        //     if (err) {
        //         console.log();
        //         response.json({ eroor: "Unable to add item" })

        //     } else {
        //         response.json("Data added.");
        //         console.log("Added item:", JSON.stringify(data, null, 2));
        //     }
        // });
    }


    async updateCase(request, response) {
        var params = {
            TableName: "CaseInfos",
            Key: {
                "name": request.body.name,
            },
            UpdateExpression: "set  address=:address, age=:age , city=:city,country=:country,createdOn=:createdOn,gender=:gender",
            ExpressionAttributeValues: {
                ":address": request.body.address,
                ":age": request.body.age,
                ":city": request.body.city,
                ":country": request.body.country,
                ":createdOn": request.body.createdOn,
                ":gender": request.body.gender,
            },
            ReturnValues: "UPDATED_NEW"
        };
        try {
            let result = await dynamodbConfig("update", params);
            response.json("Data Updated.");
        } catch (e) {
            response.json({ eroor: e })
        }



        // const dynamoDb = new aws.DynamoDB.DocumentClient({ region: "us-east-1" });

        // await dynamoDb.update(params, function (err, data) {
        //     if (err) {
        //         console.log();
        //         response.json({ eroor: "Unable to edit item" })

        //     } else {
        //         response.json("Data added.");
        //         console.log("Updated item:");
        //     }
        // });
    }

    async deleteData(parameter, response) {
        var params = { TableName: "CaseInfos", Key: { name: parameter } };
        try {
            let result = await dynamodbConfig("delete", params);
            response.json("Data deleted.");
        } catch (e) {
            response.json({ eroor: e })
        }

        // const dynamoDb = new aws.DynamoDB.DocumentClient({ region: "us-east-1" });
        // try {
        //     var params = {
        //         TableName: "CaseInfos", Key: { name: parameter }
        //     };
        //     var result = await dynamoDb.delete(params).promise();
        //     response.json("Data deleted.")
        // } catch (error) {
        //     response.json(error);
        //     console.error(error);
        // }
    }


}
module.exports = CaseDomain;