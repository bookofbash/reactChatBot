const mongoose = require('mongoose');
const {Schema} = mongoose;

const courseSchema = new Schema({
    course: String,
    link: String
});

mongoose.model('courses', courseSchema);