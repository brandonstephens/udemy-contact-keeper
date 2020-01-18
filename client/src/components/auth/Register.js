import React, { useState } from 'react'

const Register = props => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  const { name, email, password, password_confirmation } = user

  const onChange = event => setUser({ ...user, [event.target.name]: event.target.value })

  const onSubmit = event => {
    event.preventDefault()
    console.log('@todo register submit')
  }

  return (
    <div className="form-container">
      <h1 className="text-primary">Register Account</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Password Confirmation</label>
          <input type="password" name="password_confirmation" value={password_confirmation} onChange={onChange} />
        </div>

        <div>
          <input type="submit" value="Register" className="btn btn-primary btn-block" />
        </div>
      </form>
    </div>
  )
}

export default Register
