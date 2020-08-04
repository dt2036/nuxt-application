
const aws = require("aws-sdk");
// function calling(action, params) {
//     const dynamoDb = new aws.DynamoDB.DocumentClient();
//     return dynamoDb[action](params).promise();
// }
// module.exports.calling = calling;

module.exports = function (action, params) {
    const dynamoDb = new aws.DynamoDB.DocumentClient();
    return dynamoDb[action](params).promise();
}

