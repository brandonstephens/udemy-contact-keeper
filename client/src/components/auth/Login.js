import React, { useState } from 'react'

const Login = props => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const { email, password } = user

  const onChange = event => setUser({ ...user, [event.target.name]: event.target.value })

  const onSubmit = event => {
    event.preventDefault()
    console.log('@todo login submit')
  }

  return (
    <div className="form-container">
      <h1 className="text-primary">Login</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="name">Password</label>
          <input type="password" name="password" value={password} onChange={onChange} />
        </div>

        <div>
          <input type="submit" value="Login" className="btn btn-primary btn-block" />
        </div>
      </form>
    </div>
  )
}

export default Login
