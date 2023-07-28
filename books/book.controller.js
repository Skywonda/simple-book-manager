const { NotFoundError } = require("../error");
const BookService = require("./book.service");

const addBook = (req, res) => {
  const data = req.body;
  const book = BookService.create(data);
  res.status(201).json({ msg: "book created successfully", book });
};

const findBooks = (req, res) => {
  const book = BookService.find(req.query);
  res.json({ msg: "Book fetched successfully", book });
};

const searchBook = (req, res) => {
  const { keyword, ...others } = req.query;
  const books = BookService.search(keyword, others);
  res.json({ msg: "Search result", books });
};

const getSingleBook = (req, res) => {
  const isbn = req.params.isbn;
  const book = BookService.getByIsbn(isbn);
  if (!book) throw new NotFoundError("Book not found!");
  res.json({ msg: "Book found", book });
};

const updateBook = (req, res) => {
  const { body } = req;
  const isbn = req.params.isbn;
  const book = BookService.update(isbn, body);
  res.json({ msg: "Book updated successfully", book });
};

const deleteBook = (req, res) => {
  const isbn = req.params.isbn;
  const book = BookService.delete(isbn);
  if (!book) throw new NotFoundError(`Book with isbn ${isbn} does not exist!`);
  res.json({ msg: "Book delete successfully" });
};

module.exports = {
  addBook,
  findBooks,
  updateBook,
  deleteBook,
  getSingleBook,
  searchBook,
};
