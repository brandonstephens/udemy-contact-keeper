import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import ContactContext from '../../context/contact/contactContext'

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext)
  const { deleteContact } = contactContext
  const { id, name, email, phone, type } = contact

  const onDelete = () => {
    deleteContact(id)
  }

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}
        <span className={`badge badge-${type === 'work' ? 'success' : 'primary'}`} style={{ float: 'right' }}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>

      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open" /> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone" /> {phone}
          </li>
        )}
      </ul>
      <div>
        <button className="btn btn-dark btn-sm">Edit</button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
}

export default ContactItem
