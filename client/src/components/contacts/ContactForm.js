import React, { useState, useContext, useEffect } from 'react'

import ContactContext from '../../context/contact/contactContext'

const DEFAULT_CONTACT = {
  name: '',
  email: '',
  phone: '',
  type: 'personal',
}

const ContactForm = props => {
  const contactContext = useContext(ContactContext)
  const { addContact, current, clearCurrent, updateContact } = contactContext

  useEffect(() => {
    if (current !== null) {
      setContact(current)
    } else {
      setContact(DEFAULT_CONTACT)
    }
  }, [contactContext, current])

  const [contact, setContact] = useState(DEFAULT_CONTACT)
  const { name, email, phone, type } = contact

  const onChange = event =>
    setContact({
      ...contact,
      [event.target.name]: event.target.value,
    })

  const onSubmit = event => {
    event.preventDefault()

    if (current === null) {
      addContact(contact)
    } else {
      updateContact(contact)
      clearCurrent()
    }

    setContact(DEFAULT_CONTACT)
  }

  const clearAll = () => {
    clearCurrent()
    setContact(DEFAULT_CONTACT)
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary text-left">{!current ? 'Add Contact' : 'Edit Contact'}</h2>
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
      <div className="mb-1">
        <button type="submit" className="btn btn-primary btn-block">
          {!current ? (
            <>
              <i className="fas fa-plus" /> Add Contact
            </>
          ) : (
            <>
              <i className="fas fa-save" /> Update Contact
            </>
          )}
        </button>
      </div>
      {current && (
        <div className="mb-1">
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  )
}

export default ContactForm
