const http = require('http');
const express = require('express');
const config = require('./config').config;
const Routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();

let routes = new Routes();
routes.routes(app);

app.listen(config.port, function () {
 console.info('Server is running at port 3000');
});
