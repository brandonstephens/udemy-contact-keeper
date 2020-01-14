const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator/check')

const User = require('../modules/Users')

// @route    POST api/users
// @desc     Register a user
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Email must be valid').isEmail(),
    check('password', 'Passwords must have 6 or more characters').isLength({
      min: 6,
    }),
  ],
  (request, response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }

    response.send('passed')
  }
)

module.exports = router
