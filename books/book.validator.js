const createBookSchema = {
  title: ["isString", "notEmpty", "trim"],
  author: ["isString", "notEmpty", "trim"],
  description: ["isString", "isOptional", "notEmpty"],
  isbn: ["isString", "notEmpty", "trim", "minLength:10"],
  publicationYear: ["isNumber", "notEmpty", "trim", "isLength:4"],
  content: ["isString", "notEmpty"],
};

const updateBookSchema = {
  title: ["isString", "trim", "isOptional"],
  author: ["isString", "trim", "isOptional"],
  description: ["isString", "isOptional"],
  content: ["isString", "isOptional"],
};

module.exports = { createBookSchema, updateBookSchema };
