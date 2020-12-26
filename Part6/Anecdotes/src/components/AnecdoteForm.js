import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ createAnecdote, createNotification }) => {

	const createNew = async (event) => {
		event.preventDefault()
		const content = event.target.content.value
		event.target.content.value = ''
		createAnecdote(content)
		createNotification(`you created '${content}'`, 5)
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={createNew}>
				<div><input name='content' /></div>
				<button>create</button>
			</form>
		</div>
	)
}

const mapDispatchToProps = { createAnecdote, createNotification }

export default connect(null, mapDispatchToProps)(AnecdoteForm)