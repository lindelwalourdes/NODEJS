const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
    // Define your schema fields here
    title: String,
    content: String,
    // Other fields...
});

module.exports = mongoose.model('BlogPost', blogPostSchema);