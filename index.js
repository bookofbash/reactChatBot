const express = require('express');
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());

require('./routes/dialogFlowRoutes')(app);

console.log(process.env.NODE_ENV)

const PORT = process.env.PORT||5000;

app.listen(PORT);