const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema({
  type: String,
  values: [{ name: String }],
});

const Type = mongoose.model("Type", TypeSchema);

module.exports = Type;
