const express = require('express');
const bodyParser = require('body-parser');
// require('dotenv').config();
// const api_key = process.env.API_KEY;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const statues = require('./api/statues'); 
app.use('/api/statues', statues);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});