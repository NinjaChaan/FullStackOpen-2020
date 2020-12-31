import React, { useState } from 'react'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { createNotification } from '../reducers/notificationReducer'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()

	const login = (event) => {
		event.preventDefault()

		loginService.login(username, password).then(response => {
			console.log(response.status)
			if (response.status === 200) {
				dispatch(createNotification('Login successful', 5))
				dispatch(setUser(response.data.token, response.data.name))
				window.localStorage.setItem('name', response.data.name)
				window.localStorage.setItem('user', response.data.token)
			} else {
				dispatch(createNotification(response.data.error, 5))
			}
		})
	}

	return (
		<form onSubmit={login}>
			<h2>login to application</h2>
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

export default Login