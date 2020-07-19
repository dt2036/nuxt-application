const aws = require("aws-sdk");
class ProductDomain {
    
    getProducts(params, response) {
        var data = [{ "isActive": false, "src": "test.jpg", "price": "799,99 �", "ProductName": "Bodytone Ex1" }, { "isActive": false, "src": "test.jpg", "price": "799,99 �", "ProductName": "Bodytone Ex2" }, { "isActive": false, "src": "test.jpg", "price": "799,99 �", "ProductName": "Bodytone Ex3" }]
        response.json({ Items: [data[parseInt(params.pageNumber) - 1]] });
        //const dynamoDb = new aws.DynamoDB.DocumentClient({ region: "us-east-1" });
        //var expression = {
        //    "TableName": "Products",
        //     "Limit": params.totalCount,
        //};
        //dynamoDb.scan(expression, (error, data) => {
        //    if (error) {
        //        console.error("Unable to read item. Error JSON:", JSON.stringify(error, null, 2));
        //        response.json({ failed: true });
        //    } else {
        //        console.log(data)
        //        response.json(data);
        //    }
        //});
    }
}
module.exports = ProductDomain;