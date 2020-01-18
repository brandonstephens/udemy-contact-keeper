import React, { useState, useContext, useEffect } from 'react'

import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Register = props => {
  const alertContext = useContext(AlertContext)
  const authContext = useContext(AuthContext)
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const { setAlert } = alertContext
  const { register, error, clearErrors, isAuthenticated } = authContext
  const { name, email, password, password_confirmation } = user

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }

    if (error === 'User already exists') {
      setAlert(error, 'danger')
      clearErrors()
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history])

  const onChange = event => setUser({ ...user, [event.target.name]: event.target.value })

  const onSubmit = event => {
    event.preventDefault()
    if (name === '' || email === '' || password === '') {
      setAlert('Incomplete registration form', 'danger')
    } else if (password !== password_confirmation) {
      setAlert('Passwords do not match', 'danger')
    } else {
      register({ name, email, password })
    }
  }

  return (
    <div className="form-container">
      <h1 className="text-primary">Register Account</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required minLength="6" />
        </div>
        <div className="form-group">
          <label htmlFor="name">Password Confirmation</label>
          <input
            type="password"
            name="password_confirmation"
            value={password_confirmation}
            onChange={onChange}
            required
          />
        </div>

        <div>
          <input type="submit" value="Register" className="btn btn-primary btn-block" />
        </div>
      </form>
    </div>
  )
}

export default Register
