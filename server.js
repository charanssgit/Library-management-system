const express = require("express");
const connectDb = require("./db");
connectDb();
const Book = require("./bookSchema");
const app = express();
const PORT = 3000;
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/addBook", async (req, res) => {
  try {
    const { bookID, title, authorName, yearOfPublication } = req.body;
    if (!bookID || !title || !authorName || !yearOfPublication) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingBook = await Book.findOne({ bookID });
    if (existingBook) {
      return res.status(409).json({ message: "Book ID already exists" });
    }
    const newBook = await Book.create({
      bookID,
      title,
      authorName,
      yearOfPublication,
    });
    res.status(201).json({
      message: "Book added successfully",
      data: newBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding book",
      error: error.message,
    });
  }
});

app.get("/getBookID/:id", async (req, res) => {
  try {
    const { bookID } = req.body;
    if (!bookID) {
      return res.status(400).json({ message: "bookID is required" });
    }
    const book = await Book.findOne({ bookID });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving book",
      error: error.message,
    });
  }
});

app.delete("/deleteBook", async (req, res) => {
  const { id } = req.params;
  const book = await Book.findOneAndDelete({ bookID: id });
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.status(200).json({ message: "Book deleted successfully", data: book });
});

app.get("/getBooks/:id", async (req, res) => {
  const book = await Book.findById(req.params.bookID);
  if (!book) {
    return res.status(404).send("Book not found");
  } else {
    res.status(200).json(book);
  }
});

app.put("/updateBook/:id", async (req, res) => {
  try {
    const { bookID, title, authorName, yearOfPublication } = req.body;
    if (!bookID) {
      return res
        .status(400)
        .json({ message: "bookID is required to update book" });
    }
    const updateBook = await Book.findOneAndUpdate(
      { bookID: bookID },
      { title, authorName, yearOfPublication },
      { new: true }
    );
    if (!updateBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({
      message: "Book updated successfully",
      data: updateBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating book",
      error: error.message,
    });
  }
});

