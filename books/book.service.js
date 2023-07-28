const { NotFoundError, ConflictError } = require("../error");
const BookModel = require("./book.model");

class BookService {
  static books = [];

  static get(key, value) {
    const book = this.books.find((each) => (each[key] === value));
    if (!book) return null;
    return book;
  }

  static create(data) {
    const { title, author, isbn, content, description, publicationYear } = data;
    const bookExist = this.getByIsbn(isbn);
    if (bookExist) throw new ConflictError("This book already exist!");
    const book = new BookModel(
      title,
      author,
      isbn,
      publicationYear,
      description,
      content
    );
    this.books.push(book);
    return book;
  }

  static getByIsbn = (isbn) => {
    return this.get("isbn", isbn);
  };

  static search(keyword, { page = 1, perPage = 20 }) {
    const regex = new RegExp(keyword, 'gi')
    const searchBox = []

    for (let i = 0; i < this.books.length; i++) {
      const book = this.books[i];
      if (regex.test(book.title) || regex.test(book.author)) {
        searchBox.push(book);
      }
    }

    const startIndex = (page - 1) * perPage;
    let endIndex = startIndex + perPage;
    if (endIndex > searchBox.length) endIndex = searchBox.length
    const data = [];

    for (let i = startIndex; i < endIndex; i++) {
      data.push(searchBox[i])
    }
    return data


  }

  static find(query) {
    const { page = 1, perPage = 20 } = query;
    const startIndex = (page - 1) * perPage;
    let endIndex = startIndex + parseInt(perPage)
    if (endIndex > this.books.length) endIndex = this.books.length;
    const data = [];

    for (let i = startIndex; i < endIndex; i++) {
      data.push(this.books[i])
    }
    return data

  }

  static update = (isbn, newData) => {
    const bookIndex = this.books.findIndex((each) => each.isbn === isbn);
    if (bookIndex === -1) {
      throw new NotFoundError(`Book with isbn ${isbn} does not exist!`);
    }
    const book = this.books[bookIndex];
    this.books[bookIndex] = { ...book, ...newData };

    return this.books[bookIndex];
  };

  static delete = (isbn) => {
    const index = this.books.findIndex((book) => book.isbn === isbn);
    if (index === -1) {
      return null;
    }
    const deletedBook = this.books.pop(index);
    return deletedBook;
  };

  static deleteAll = () => {
    return (this.books = []);
  };
}

module.exports = BookService;
