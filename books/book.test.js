const request = require("supertest");

const app = require("../app");
const BookService = require("./book.service");

describe("Book Endpoints", () => {
  let testBook = {
    title: "This is my first test book",
    author: "Test Author",
    description: "This is a test book.",
    isbn: "1234567890",
    publicationYear: "2023",
    content: "This is the book content.",
  };

  async function createBook() {
    BookService.create(testBook);
  }

  beforeEach(() => {
    createBook();
  });

  afterEach(() => {
    BookService.deleteAll();
  });

  it("should add a new book", async () => {
    BookService.deleteAll();
    const response = await request(app).post("/book").send(testBook);
    expect(response.status).toBe(201);
    expect(response.body.msg).toBe("book created successfully");
    expect(response.body.book).toEqual(expect.objectContaining(testBook));
  });

  it("should not create book with existing isbn", async () => {
    const response = await request(app).post("/book").send(testBook);
    expect(response.status).toBe(409);
    expect(response.body.msg).toBe("This book already exist!");
  });

  it("should handle invalid data on create", async () => {
    const invalidBookData = {
      description: "This is an invalid book.",
      publicationYear: "2023",
      content: "This is the invalid book content.",
    };

    const response = await request(app).post("/book").send(invalidBookData);

    expect(response.status).toBe(422);
  });

  it("should fetch books", async () => {
    const response = await request(app).get("/book");
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe("Book fetched successfully");
    expect(Array.isArray(response.body.book)).toBe(true);
  });

  it("should update a book", async () => {
    const updatedBookData = {
      title: "Updated Test Book",
      author: "Updated Test Author",
      description: "This is an updated test book.",
      content: "This is the updated book content.",
    };

    const updateResponse = await request(app)
      .put(`/book/${testBook.isbn}`)
      .send(updatedBookData);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.msg).toBe("Book updated successfully");
    expect(updateResponse.body.book).toEqual(
      expect.objectContaining(updatedBookData)
    );
  });
  it("should delete a book", async () => {
    const deleteResponse = await request(app).delete(`/book/${testBook.isbn}`);

    expect(deleteResponse.status).toBe(200);
    expect(deleteResponse.body.msg).toBe("Book delete successfully");

    const fetchResponse = await request(app).get("/book");
    expect(fetchResponse.status).toBe(200);
    expect(Array.isArray(fetchResponse.body.book)).toBe(true);
  });
});
