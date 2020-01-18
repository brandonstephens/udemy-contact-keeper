import React, { useContext } from 'react'
import ContactIem from './ContactItem'

import ContactContext from '../../context/contact/contactContext'

const Contacts = props => {
  const contactContext = useContext(ContactContext)

  const { contacts, filtered } = contactContext

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>
  }

  return (
    <>
      {filtered !== null
        ? filtered.map(contact => <ContactIem key={contact.id} contact={contact} />)
        : contacts.map(contact => <ContactIem key={contact.id} contact={contact} />)}
    </>
  )
}

export default Contacts
