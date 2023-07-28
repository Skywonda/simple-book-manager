const { randBook, randQuote, randPhrase } = require('@ngneat/falso')
const generateISBN = require('../algorithm/isbn')
const generateRandomYear = require('../algorithm/year')

module.exports = () => {
  const book = randBook()
  return {
    title: book.title,
    author: book.author,
    description: randQuote(),
    publicationYear: generateRandomYear(),
    isbn: generateISBN(),
    content: randPhrase()
  }
}