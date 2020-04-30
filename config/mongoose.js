const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost/polling`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

//Connecting to DataBase
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;