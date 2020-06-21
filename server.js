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

docClient.scan(params, onScan);
var scanRes = [];

function onScan(err,data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON: ", JSON.stringify(err, null, 2));
    }
    else {
        console.log("Scan successful.");
        data.Items.forEach(function(itemdata) {
            scanRes.push(JSON.stringify(itemdata));
        });

        //continue scanning if more items
        // if (typeof data.LastEvaluatedKey != "undefined") {
        //     console.log("Scanning again...");
        //     params.ExclusiveStartKey = data.LastEvaluatedKey;
        //     docClient.scan(params, onScan);
        // }
    }
}

app.get('/', function (req, res) {
    res.send(scanRes);
})


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
