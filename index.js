const express = require("express");

//import  db connection file
const DbConnection = require("./DBConnection");


const dotenv = require("dotenv");


//import routes
const userRouter = require("./routes/users");
const booksRouter = require("./routes/books");


dotenv.config();

const app = express();
DbConnection();

const port = 8081;

app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({
        message: "server is up and running successfully !!",
    
    });
});
 
 

app.use("/users", userRouter);
app.use("/books", booksRouter);
 





app.get("*", (req, res) => {
    res.status(404).json({
        message: "this rout doesnot exist!!",
    });
});

app.listen(port, () => {
    console.log(`server is running at port ${port}`);
});


