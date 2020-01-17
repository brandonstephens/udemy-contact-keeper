import React, { useContext } from 'react'
import ContactIem from './ContactItem'

import ContactContext from '../../context/contact/contactContext'

const Contacts = props => {
  const contactContext = useContext(ContactContext)

  const { contacts } = contactContext

  return (
    <>
      {contacts.map(contact => (
        <ContactIem key={contact.id} contact={contact} />
      ))}
    </>
  )
}

export default Contacts
