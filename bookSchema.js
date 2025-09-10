const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  bookID: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  yearOfPublication: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Book", bookSchema);
