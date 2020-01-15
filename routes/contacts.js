const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator/check')

const User = require('../models/User')
const Contact = require('../models/Contact')

// @route    GET api/contacts
// @desc     Get all users contacts
// @access   Private
router.get('/', auth, async (request, response) => {
  try {
    const contacts = await Contact.find({ user: request.user.id }).sort({ date: -1 })
    response.json(contacts)
  } catch (error) {
    console.error(error.message)
    response.status(500).send('Server Error')
  }
})

// @route    POST api/contacts
// @desc     Add new contact
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() })
    }

    const { name, email, phone, type } = request.body

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: request.user.id,
      })

      const contact = await newContact.save()
      response.json(contact)
    } catch (error) {
      console.error(error.message)
      response.status(500).send('Server Error')
    }
  }
)

// @route    PUT api/contacts/:id
// @desc     Update contact
// @access   Private
router.put('/:id', auth, async (request, response) => {
  const { name, email, phone, type } = request.body

  // build contact object
  const contactFields = {}
  if (name) contactFields.name = name
  if (email) contactFields.email = email
  if (phone) contactFields.phone = phone
  if (type) contactFields.type = type

  try {
    let contact = await Contact.findById(request.params.id)

    if (!contact) return response.status(404).json({ message: 'Contact not found' })

    // make sure user owns contact
    if (contact.user.toString() !== request.user.id) {
      return response.status(401).json({ message: 'Not Authorized' })
    }

    contact = await Contact.findByIdAndUpdate(request.params.id, { $set: contactFields }, { new: true })

    response.json(contact)
  } catch (error) {
    console.error(error.message)
    response.status(500).send('Server Error')
  }
})

// @route    DELETE api/contacts/:id
// @desc     Delete contact
// @access   Private
router.delete('/:id', auth, async (request, response) => {
  try {
    let contact = await Contact.findById(request.params.id)

    if (!contact) return response.status(404).json({ message: 'Contact not found' })

    // make sure user owns contact
    if (contact.user.toString() !== request.user.id) {
      return response.status(401).json({ message: 'Not Authorized' })
    }

    await Contact.findByIdAndRemove(request.params.id)

    response.json({ message: 'Contact removed' })
  } catch (error) {
    console.error(error.message)
    response.status(500).send('Server Error')
  }
})

module.exports = router
