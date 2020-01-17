import React, { useReducer } from 'react'
import uuid from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types'

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        type: 'work',
        name: 'Jane Doe',
        email: 'jane@doe.com',
        phone: '555-444-5555',
      },
      {
        id: 2,
        type: 'work',
        name: 'Howdy Duty',
        email: 'oopsie@doopsie.com',
        phone: '555-555-5555',
      },
    ],
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)

  // Add Contacts
  // Delete Contact
  // Set Current Contact
  // Clear Current Contact
  // Update Contact
  // Filter Contacts
  // Clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState
