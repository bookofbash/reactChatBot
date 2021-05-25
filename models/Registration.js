const mongoose = require('mongoose');
const { Schema } = mongoose;
//Registration isn't working in development
const registrationSchema = new Schema({
    name: String,
    address: String,
    email: String, 
    phone: String,
    registereDate: Date
})


mongoose.model('registration', registrationSchema);