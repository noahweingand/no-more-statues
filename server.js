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

var scanPromise = docClient.scan(params).promise();

app.get('/getAllStatues', function (req, res) {
    scanPromise.then(
        function(data) {
            console.log("scan successful");
            res.send(data)
        },
        function(error) {
            console.log("error on /getAllStatues")
            res.send(error);
        }
    )
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
