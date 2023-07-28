const readlineSync = require("readline-sync");

const BookService = require("../books/book.service");
const dummyBook = require('./book.generator')

function generateDummyBooks(quantity = 1000) {
  for (let i = 0; i < quantity; i++) {
    BookService.create(dummyBook())
  }
  return
}


function start() {
  while (true) {
    const quantity = readlineSync.question("The quantity of books that should be generated (press Enter to generate 1000 books): ");

    if (quantity === "") {
      generateDummyBooks()
      break;
    } else if (!Number(quantity) || parseInt(quantity) < 1) {
      console.log('Invalid number input. Please enter a valid positive number.');
    } else {
      generateDummyBooks(parseInt(quantity));
      break;
    }
  }
}

module.exports = { start, generateDummyBooks };