const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const config = require('./config/keys');
const mongoose = require('mongoose');


require('./models/Registration');
require('./models/Demand');
require('./models/Courses');

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true  });
app.use(bodyParser.json());

require('./routes/dialogFlowRoutes')(app);
require('./routes/fulfillmentRoutes')(app);

if (process.env.NODE_ENV === "production") {
    //JS & CSS
    app.use(express.static('client/build'));
    //Index.html for all page routes
    app.get('*', (req, res) => {
        const path = require('path');
        res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT||5000;
app.listen(PORT);

