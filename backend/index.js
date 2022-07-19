const http = require('http');
const express = require('express');
const questions = require('./questions').questions;
const config = require('./config').config;
const Routes = require('./REST/routes');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '2048kb'}));

app.get('/api/questions', (request, response) => {
   response.send(questions);
   console.log("udalo sie");
});

let routes = new Routes();
routes.routes(app);

app.listen(config.port, function () {
 console.info('Server is running at port 3000');
});
