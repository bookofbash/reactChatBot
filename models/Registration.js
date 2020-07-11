const mongoose = require('mongoose');

const { Schema } = mongoose;

const registrationSchema = new Schema({
    name: String,
    address: String,
    email: String, 
    phone: String,
    registeredOn: Date
})


mongoose.model('registration', registrationSchema);