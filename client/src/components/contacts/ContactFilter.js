import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactFilter = props => {
  const contactContext = useContext(ContactContext)
  const { clearFilter, filterContacts, filtered } = contactContext
  const text = useRef('')

  useEffect(() => {
    if (filtered === null) {
      text.current.value = ''
    }
  })

  const onChange = event => {
    if (text.current.value !== '') {
      filterContacts(event.target.value)
    } else {
      clearFilter()
    }
  }

  return (
    <form action="">
      <input ref={text} type="text" placeholder="filter contacts" onChange={onChange} />
    </form>
  )
}

export default ContactFilter
