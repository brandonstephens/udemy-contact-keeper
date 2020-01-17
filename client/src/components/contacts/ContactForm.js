import React, { useState, useContext } from 'react'

import ContactContext from '../../context/contact/contactContext'

const DEFAULT_CONTACT = {
  name: '',
  email: '',
  phone: '',
  type: 'personal',
}

const ContactForm = props => {
  const contactcontext = useContext(ContactContext)

  const [contact, setContact] = useState(DEFAULT_CONTACT)

  const { name, email, phone, type } = contact

  const onChange = event =>
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    })

  const onSubmit = event => {
    event.preventDefault()
    contactcontext.addContact(contact)
    setContact(DEFAULT_CONTACT)
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary text-left">Add Contact</h2>
      <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
      <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} />
      <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal' ? true : false}
        onChange={onChange}
      />{' '}
      Personal
      <input type="radio" name="type" value="work" checked={type === 'work' ? true : false} onChange={onChange} /> Work
      <div>
        <button type="submit" className="btn btn-primary btn-block">
          <i className="fas fa-plus" /> Add Contact
        </button>
      </div>
    </form>
  )
}

export default ContactForm
