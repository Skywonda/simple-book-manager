const router = require("express").Router();

const { validateSchema } = require("../validator");
const { createBookSchema, updateBookSchema } = require("./book.validator");
const {
  addBook,
  findBooks,
  updateBook,
  deleteBook,
  getSingleBook,
  searchBook,
} = require("./book.controller");
const { generateDummyBooks } = require("../script");

router
  .route("/")
  .post(validateSchema(createBookSchema), addBook)
  .get(findBooks);

router.route("/search").get(searchBook);

router
  .route("/:isbn")
  .put(validateSchema(updateBookSchema), updateBook)
  .delete(deleteBook)
  .get(getSingleBook);

router.route("/generate").post((req, res) => {
  const quantity = req.body.quantity
  generateDummyBooks(quantity);
  res.status(201).json({ msg: "Dummy books created!" });
});
module.exports = router;
