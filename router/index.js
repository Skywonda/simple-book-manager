const router = require('express').Router()
const bookRouter = require('../books')

router.use('/book', bookRouter)

module.exports = router