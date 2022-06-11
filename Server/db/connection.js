//Import the mongoose module
const mongoose = require("mongoose");

//Set up default mongoose connection
const mongoDB =
  "mongodb+srv://developer:devo1234@cluster0.juo1t.mongodb.net/NLP?retryWrites=true&amp;w=majority&amp;ssl=true&amp;ssl_cert_reqs=CERT_NONE";
const mongoosePromise = () =>
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected successfully");
});
