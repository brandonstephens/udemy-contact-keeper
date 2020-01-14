const express = require('express')
const router = express.Router()

// @route    POST api/users
// @desc     Register a user
// @access   Public
router.post('/', (request, response) => {
  response.send('Registers a user')
})

module.exports = router
