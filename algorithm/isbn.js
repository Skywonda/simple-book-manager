const usedISBNs = new Set();

function generateISBN() {
  const prefix = "978";
  let randomDigits;

  do {
    randomDigits = Math.floor(Math.random() * 1000000000).toString().padStart(9, "0");
    const isbn = prefix + randomDigits;
    if (!usedISBNs.has(isbn)) {
      usedISBNs.add(isbn);
      return isbn;
    }
  } while (true);
}

module.exports = generateISBN;