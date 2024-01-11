//creating express server 
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const { connectDb } = require("./conifg/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

const port = process.env.PORT || 5000;

//middleware
app.use(express.json()); //whenever we recieve data from a client than we need to use a body parser to parse the data so for that we're here using express middleware
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server running on ${port}`);
});

