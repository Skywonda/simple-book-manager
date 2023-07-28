const readlineSync = require("readline-sync");

const BookService = require("../books/book.service");
const { validateInput } = require("../validator");
const { createBookSchema } = require("../books/book.validator");
const { start: generateBooks } = require("../script");

function logError(errorMessage) {
  // Check if the console supports color
  const isColorSupported = process.stdout.isTTY;

  // ANSI escape codes for color formatting
  const redColorCode = "\x1b[31m";
  const resetColorCode = "\x1b[0m";

  const formattedErrorMessage = isColorSupported
    ? redColorCode + errorMessage + resetColorCode
    : errorMessage;

  console.error(formattedErrorMessage);
}

function displayMenu() {
  console.log("\n=== Book Management System CLI ===");
  console.log("1. Add a new book");
  console.log("2. View all books");
  console.log("3. View a single book by ISBN number");
  console.log("4. Update book details");
  console.log("5. Delete a book");
  console.log("6. Search books by title or author");
  console.log("7. Generate dummy books");
  console.log("8. Exit");
}

function createBookPrompt() {
  const title = readlineSync.question("Enter book title: ");
  const author = readlineSync.question("Enter book author: ");
  const publicationYear = readlineSync.questionInt("Enter publication year: ");
  const description = readlineSync.question("Enter your description: ");
  const content = readlineSync.question("Enter your book content: ");
  const isbn = readlineSync.question("Enter ISBN number: ");

  return { title, author, publicationYear, isbn, description, content };
}

function updateBookPrompt() {
  const prompts = [
    { prompt: "Enter book title: ", field: "title" },
    { prompt: "Enter book author: ", field: "author" },
    { prompt: "Enter your description: ", field: "description" },
    { prompt: "Enter your book content: ", field: "content" },
  ];

  const result = {};

  for (const { prompt, field } of prompts) {
    const userInput = readlineSync.question(prompt).trim();
    if (userInput.length > 0) {
      result[field] = userInput;
    }
  }

  return result;
}

function addNewBook() {
  console.log("=== Add a new book ===");
  const bookDetails = createBookPrompt();

  const validationErrors = validateInput(bookDetails, createBookSchema);
  if (validationErrors.length) {
    logError("\nInput validation errors:");
    validationErrors.forEach((each) => logError(each));
    return;
  }
  const newBook = BookService.create(bookDetails);
  console.log("Book added successfully:");
  console.log(newBook);
  return;
}

function viewAllBooks() {
  console.log("\n=== View all books ===");
  const pageInput = readlineSync.question("Enter page or leave it blank: ")
  const perPageInput = readlineSync.question("Enter Number of documents to be retrieve or leave it blank: ")
  const page = pageInput ? parseInt(pageInput) : 1;
  const perPage = perPageInput ? parseInt(perPageInput) : 20;

  const books = BookService.find({ page, perPage });
  console.log("All books:");
  console.log(books);
}

function viewSingleBook() {
  console.log("\n=== View a single book by ISBN number ===");
  const isbn = readlineSync.question("Enter ISBN number: ");

  const book = BookService.getByIsbn(isbn);
  console.log("Book details:");
  console.log(book);
}

function updateBookDetails() {
  console.log("\n=== Update book details ===");
  console.log("\nLeave unwanted field blank!!!");
  const isbn = readlineSync.question(
    "Enter ISBN number of the book to update: "
  );
  const bookDetails = updateBookPrompt();

  const updatedBook = BookService.update(isbn, bookDetails);
  console.log("Book updated successfully:");
  console.log(updatedBook);
}

function deleteBookByISBN() {
  console.log("\n=== Delete a book ===");
  const isbn = readlineSync.question(
    "Enter ISBN number of the book to delete: "
  );

  const deletedBook = BookService.delete(isbn);
  if (!deletedBook) {
    logError(`Book with isbn ${isbn} does not exist!`);
    return;
  }
  console.log("Book deleted successfully:");
}

function searchBooksByTitleOrAuthor() {
  console.log("=== Search books by title or author ===");
  const searchTerm = readlineSync.question(
    "Enter the title or author name to search: "
  );
  const pageInput = readlineSync.question("Enter page or leave it blank: ")
  const perPageInput = readlineSync.question("Enter Number of documents to be retrieve or leave it blank: ")
  const page = pageInput ? parseInt(pageInput) : 1;
  const perPage = perPageInput ? parseInt(perPageInput) : 20;
  const searchResults = BookService.search(searchTerm, { page, perPage });
  console.log("\n==Search results==");
  console.log(searchResults);
}
function main() {
  while (true) {
    displayMenu();
    const choice = readlineSync.questionInt("Enter your choice: ");

    switch (choice) {
      case 1:
        addNewBook();
        break;
      case 2:
        viewAllBooks();
        break;
      case 3:
        viewSingleBook();
        break;
      case 4:
        updateBookDetails();
        break;
      case 5:
        deleteBookByISBN();
        break;
      case 6:
        searchBooksByTitleOrAuthor();
        break;
      case 7:
        console.log("Generating books....");
        generateBooks();
        console.log("Books generated");
        break;
      case 8:
        console.log("Exiting the Book Management System CLI.");
        return;
      default:
        console.log("Invalid choice. Please try again.");
    }
  }
}

main();
