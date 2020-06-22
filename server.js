const express = require('express');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
aws.config.update({
    region: "us-east-1"
})
// require('dotenv').config();
// const api_key = process.env.API_KEY;

const app = express();
const docClient = new aws.DynamoDB.DocumentClient();
var params = { TableName: 'no-more-statues' };
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/getAllStatues', function (req, res) {
    var scanPromise = docClient.scan(params).promise();
    scanPromise.then(
        function(data) {
            console.log("/getAllStatues call successful");
            res.send(data)
        },
        function(error) {
            console.log("error on /getAllStatues call")
            res.send(error);
        }
    )
})

app.post('/getStatuesByDate', function (req, res) {
    var dateParams = {
        TableName: "no-more-statues",
        FilterExpression: "begins_with (removalDate, :date)",
        ExpressionAttributeValues: {
            ":date": req.body.date
        }
    }
    let datePromise = docClient.scan(dateParams).promise();
    datePromise.then(
        function(data) {
            console.log("/getStatuesByDate call successful");
            res.send(data)
        },
        function(error) {
            console.log("error on /getStatuesByDate call")
            res.send(error);
        }
    )
})

app.post('/getStatuesByName', function (req, res) { 
    var nameParams = {
        TableName: "no-more-statues",
        FilterExpression: "begins_with (#name, :name)", // case sensitive, probably need to change
        ExpressionAttributeNames: {
            "#name": "name" // name is a reserved word with dynamodb, so work around
        },
        ExpressionAttributeValues: {
            ":name": req.body.name
        }
    }
    let namePromise = docClient.scan(nameParams).promise();
    namePromise.then(
        function(data) {
            console.log("/getStatuesByName call successful");
            res.send(data)
        },
        function(error) {
            console.log("error on /getStatuesByName call")
            res.send(error);
        }
    )
})

app.get('/getRemovedStatues', function (req, res) { 
    var isRemovedParams = {
        TableName: "no-more-statues",
        FilterExpression: "removed = :status",
        ExpressionAttributeValues: {
            ":status": true
        }
    }
    let removedPromise = docClient.scan(isRemovedParams).promise();
    removedPromise.then(
        function(data) {
            console.log("/getRemovedStatues call successful");
            res.send(data)
        },
        function(error) {
            console.log("error on /getRemovedStatues call")
            res.send(error);
        }
    )
})

app.get('/getStandingStatues', function (req, res) { 
    var isRemovedParams = {
        TableName: "no-more-statues",
        FilterExpression: "removed = :status",
        ExpressionAttributeValues: {
            ":status": false
        }
    }
    let standingPromise = docClient.scan(isRemovedParams).promise();
    standingPromise.then(
        function(data) {
            console.log("/getStandingStatues call successful");
            res.send(data)
        },
        function(error) {
            console.log("error on /getStandingStatues call")
            res.send(error);
        }
    )
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
