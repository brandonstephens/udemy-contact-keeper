const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator/check')

const User = require('../models/Users')

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
  async (request, response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = request.body

    try {
      let user = await User.findOne({ email })

      if (user) {
        return response.status(400).json({ message: 'User already exists' })
      }

      user = new User({
        name,
        email,
        password,
      })
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()

      const payload = {
        user: {
          id: user.id,
        },
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (error, token) => {
          if (error) throw error
          response.json({ token })
        }
      )
    } catch (error) {
      console.error(error.message)
      response.status(500).send('Server Error')
    }
  }
)

module.exports = router
