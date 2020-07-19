const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const router = express.Router();
const aws = require("aws-sdk");
var bouncer = require("../../infrastructure/security/bouncer");
const modelState = require('../../input-validation/model-state');
const UserCredentialSchema = require('../../schemas/user-credential');

const INVALID_CREDENTIALS = "Invalid Credentials";

class AuthenticationController {
    static async post(request, response) {

        const { username, password } = request.body;
        var expression = {
            "TableName": "Users",
            "Key": {
                UserId: {
                    'S': username
                },
                Password: {
                    'S': password
                }
            },
            "ProjectionExpression": "UserId, Password"
        };
        const dynamodb = new aws.DynamoDB({ region: process.env.REGION_ID });
        await dynamodb.getItem(expression, (error, data) => {
            if (data && data !== null && Object.keys(data).length > 0) {
                const accessToken = jsonwebtoken.sign(
                    {
                        username,
                        name: 'User ' + username,
                        scope: ['test', 'user']
                    }, process.env.TOKEN_KEY, {
                    expiresIn: process.env.EXPIRES_IN
                });
                response.json({
                    token: accessToken
                });
            } else {
                response.statusCode = 400;
                response.send(INVALID_CREDENTIALS);
            }
        });
    }
}
router.post('/', [bouncer.block, modelState(UserCredentialSchema)], AuthenticationController.post);
module.exports = router;