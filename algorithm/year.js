function generateRandomYear() {
  const currentYear = new Date().getFullYear();
  const minYear = 1900;
  const maxYear = currentYear;

  const randomYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
  return randomYear;
}

module.exports = generateRandomYear