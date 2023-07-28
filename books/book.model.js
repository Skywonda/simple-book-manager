const generateIdentity = require("../algorithm/uuid");

class BookModel {
  constructor(title, author, isbn, publicationYear, description, content) {
    this.id = generateIdentity()
    this.title = title;
    this.author = author;
    this.description = description;
    this.content = content;
    this.isbn = isbn;
    this.publicationYear = publicationYear;
  }
}

module.exports = BookModel;
