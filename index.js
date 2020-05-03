const express = require('express');
const app = express()

app.get('/', (req, res) => {
    res.send({'hello':'there'});
})

console.log('app started on port 5000')
app.listen(5000);