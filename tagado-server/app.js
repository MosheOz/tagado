const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Type = require("./models");

//Set up default mongoose connection
const mongoDB =
  "mongodb+srv://developer:devo1234@cluster0.juo1t.mongodb.net/NLP";
//?retryWrites=true&amp;w=majority&amp;ssl=true&amp;ssl_cert_reqs=CERT_NONE

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

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.post("/add-type", async (request, response) => {
  let { type, values } = request.body;
  const filter = { type };
  let isTypeExist = await Type.find(filter);
  const typeAdded = new Type(request.body);

  try {
    if (isTypeExist.length) {
      const update = { values: [...isTypeExist[0].values, ...values] };
      let doc = await Type.findOneAndUpdate(filter, update);
      response.send(doc);
    } else {
      await typeAdded.save();
      response.send(typeAdded);
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/types", async (request, response) => {
  const types = await Type.find({});

  try {
    response.send(types);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/values/:id", async (request, response) => {
  const id = request.params.id;
  const type = await Type.find({ _id: id });

  try {
    response.send(type);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.listen(PORT, console.log("listening on port " + PORT));
