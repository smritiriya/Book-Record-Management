const mongoose = require("mongoose");


function DbConnection() { 
    const DB_URL = process.env.MONGO_URI;

    mongoose.connect(DB_URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
                   
    });

    const db = mongoose.connection;
         // if error occur
    db.on("error", console.error.bind("connection error"));
         // we will connect to db only at once
    db.once("open", function () {
        console.log("Db connected!!! ");
    });
    // first we have to start the server then cooncetion to db will take place
    // server has started 
}  
 
module.exports = DbConnection;