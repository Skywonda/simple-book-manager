# simple-book-manager Documentation

## Project Description

Simple Book Manager is a Node.js project that provides basic functionality to manage a collection of books. The project includes a BookService class that allows users to create, retrieve, update, and delete books, as well as perform searches and basic pagination. This documentation covers the controller functionalities that handle HTTP requests and responses for managing books.

## Requirements

- Node.js (>= v8.0.0)
- npm (Node Package Manager)

## Features

- create a new book
- retrieve books with pagination
- search books by keyword(title, author)
- get single book by isbn
- update book by isbn
- delete book by isbn
- generate dummy books
- Error handling
- input validations
- Interactive CLI Interface (cli)
- unit test

# Installation Guide

To set up the "simple-book-manager" project, follow these steps:

### clone repo

```bash
git clone <repository_url>
```

### change directory to project folder

```bash
cd simple-book-manager
```

### install project dependencies

```bash
npm install

```

### run server

```bash
npm run start
```

### run interactive cli

```bash
run run book:ci
```

# API

## Create book

- Route: / book
- Method: POST
- Body:

```bash
$ curl -X POST -H "Content-Type: application/json" -d '{
  "title": "Sample Book",
  "author": "John Doe",
  "isbn": "1234567890",
  "content": "This is the content of the book.",
  "description": "This is a sample book.",
  "publicationYear": 2023,
}

```

### Example Response

```bash
{
  "msg": "Book created successfully",
  "book": {
    "id": "abdcef.......",
    "title": "Sample Book",
    "author": "John Doe",
    "isbn": "1234567890",
    "content": "This is the content of the book.",
    "description": "This is a sample book.",
    "publicationYear": 2023
  }
}
```

## Get books with pagination

- Route: / book
- Method: GET

```
curl -X GET http://localhost:8000/book?page=2&perPage=5
```

### Example response

```
{
  "msg": "Books fetched successfully",
  "books": [
    {
      "title": "Book 6",
      "author": "Author 6",
      "isbn": "9876543210",
      "content": "Content of Book 6.",
      "description": "Description of Book 6.",
      "publicationYear": 2022
    },
    ...
  ]
}
```

## Search Books

- Route: / book/search
- Method: GET

```
curl -X GET http://localhost:8000/book/search?keyword=sample&page=1&perPage=10

```

### Example response

```
{
  "msg": "Search result",
  "books": [
    {
      "title": "Sample Book 1",
      "author": "John Doe",
      "isbn": "1234567890",
      "content": "Content of Sample Book 1.",
      "description": "This is a sample book.",
      "publicationYear": 2023
    },
    ...
  ]
}
```

## Get single book by isbn

- Route: / book/isbn
- Method: GET

```
curl -X GET http://localhost:8000/book/1234567890
```

### Example response

```
{
  "msg": "Book found",
  "book": {
    "title": "Sample Book",
    "author": "John Doe",
    "isbn": "1234567890",
    "content": "This is the content of the book.",
    "description": "This is a sample book.",
    "publicationYear": 2023
  }
}
```

## Update a book

- Route: / book/isbn
- Method: PUT

```bash
curl -X PUT -H "Content-Type: application/json" -d '{
  "description": "Updated description."
}' http://localhost:8000/book/1234567890
```

### Example response

```
{
 "msg": "Book updated successfully",
 "book": {
   "title": "Sample Book",
   "author": "John Doe",
   "isbn": "1234567890",
   "content": "This is the content of the book.",
   "description": "Updated description.",
   "publicationYear": 2023
 }
}
```

## Delete book by isbn

- Route: / book/isbn
- Method: DELETE

```
curl -X DELETE http://localhost:8000/book/1234567890
```

### Examples response

```
{
 "msg": "Book deleted successfully"
}
```

### Generate dummy books

- Route: /book/generate
- Method: POST

```
curl -X POST http://localhost:3000/book/generate
```

### Example response

```
{
	"msg": "Dummy books created!"
}
```

## Creator

- Oluwadamilola Ajayi
