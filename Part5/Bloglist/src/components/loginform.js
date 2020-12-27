import React, { useState } from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'

const Login = ({ setLoggedIn, setName, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const login = (event) => {
    event.preventDefault()

    loginService.login(username, password).then(response => {
      console.log(response.status)
      if (response.status === 200) {
        setMessage('Login successful')
        setLoggedIn(true)
        setName(response.data.name)
        setUser(response.data.token)
        window.localStorage.setItem('name', response.data.name)
        window.localStorage.setItem('user', response.data.token)
      } else {
        setMessage(response.data.error)
      }
      setTimeout(() => {
        setMessage('')
      }, 5000)
    })
  }

  return (
    <form onSubmit={login}>
      <h2>login to application</h2>
      <span>{message}</span>
      <br />
      <br />
      <span>username</span>
      <input
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}>
      </input>
      <br />
      <span>password</span>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}>
      </input>
      <br />
      <button id="login" onClick={login}>login</button>
    </form >
  )
}

Login.propTypes = {
  setLoggedIn: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
}

export default Login