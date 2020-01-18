import React, { useState, useContext, useEffect } from 'react'

import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = props => {
  const authContext = useContext(AuthContext)
  const alertContext = useContext(AlertContext)
  const { setAlert } = alertContext
  const { login, error, clearErrors, isAuthenticated } = authContext

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/')
    }

    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger')
      clearErrors()
    }
    // eslint-disable-next-line
  }, [isAuthenticated, props.history])

  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const { email, password } = user

  const onChange = event => setUser({ ...user, [event.target.name]: event.target.value })

  const onSubmit = event => {
    event.preventDefault()
    if (email === '' || password === '') {
      setAlert('Missing email or password', 'danger')
    } else {
      login({ email, password })
    }
  }

  return (
    <div className="form-container">
      <h1 className="text-primary">Login</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} requried />
        </div>
        <div className="form-group">
          <label htmlFor="name">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} requried />
        </div>

        <div>
          <input type="submit" value="Login" className="btn btn-primary btn-block" />
        </div>
      </form>
    </div>
  )
}

export default Login
