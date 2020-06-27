const express = require('express'); 
const statues = express.Router();
const aws = require('aws-sdk');
aws.config.update({
    region: "us-east-1"
})
const docClient = new aws.DynamoDB.DocumentClient();

statues.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

statues.get('/all', async function (req, res) {
    var params = { TableName: 'no-more-statues' };
    try {
        const data = await docClient.scan(params).promise();
        console.log("get all statues call successful");
        res.send(data);
    }
    catch (error) {
        console.log("error on get all statues call");
        res.send(error);
    }
})

statues.get('/date', async function (req, res) {
    var dateParams = {
        TableName: "no-more-statues",
        FilterExpression: "begins_with (removalDate, :date)",
        ExpressionAttributeValues: {
            ":date": req.query.date
        }
    }
    try {
        let data = await docClient.scan(dateParams).promise();
        console.log("get statues by date call successful");
        res.send(data);
    }
    catch (error) {
        console.log("error on get statues by date call");
        res.send(error);
    }
})

statues.get('/name', async function (req, res) { 
    var nameParams = {
        TableName: "no-more-statues",
        FilterExpression: "contains (#name, :name)", // case sensitive, probably need to change
        ExpressionAttributeNames: {
            "#name": "searchName" // name is a reserved word with dynamodb, so work around
        },
        ExpressionAttributeValues: {
            ":name": req.query.name
        }
    }
    try {
        const data = await docClient.scan(nameParams).promise();
        console.log("get statues by name call successful");
        res.send(data);
    }
    catch (error) {
        console.log("error on get statues by name call");
        res.send(error);
    }
})

statues.get('/standing', async function (req, res) { 
    var isRemovedParams = {
        TableName: "no-more-statues",
        FilterExpression: "removed = :status",
        ExpressionAttributeValues: {
            ":status": (req.query.not == 'true') ? true : false
        }
    }
    try {
        const data = await docClient.scan(isRemovedParams).promise();
        console.log("get standing statues call successful");
        res.send(data);
    }
    catch (error) {
        console.log("error on get standing statues call");
        res.send(error);
    }
})

module.exports = statues;