const express = require('express');
const bodyParser = require('body-parser');

// .Env
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Configure bodyParser to process orders
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const covid_data = require('./routes/covid.route');

// API's
app.use('/api/v1/covid', covid_data);

const connect_server = () => {
    const PORT = process.env.PORT || 8080
    app.listen(PORT, ()=> {
        console.log(`Server running in PORT: ${PORT}\b\n`);
    });
}


connect_server();