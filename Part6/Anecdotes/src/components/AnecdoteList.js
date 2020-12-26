import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes, voteAnecdote, createNotification }) => {
	// const anecdotes = useSelector(state => {
	// 	return state.anecdotes.filter((x) => x.content.toLowerCase().includes(state.filter.toLowerCase()))
	// })
	// const dispatch = useDispatch()

	const vote = (anecdote) => {
		voteAnecdote(anecdote.id, anecdote.votes + 1)
		createNotification(`you voted '${anecdote.content}'`, 5)
	}

	return (
		<div>
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		anecdotes: state.anecdotes.filter((x) => x.content.toLowerCase().includes(state.filter.toLowerCase())),
	}
}
const mapDispatchToProps = { voteAnecdote, createNotification }


export default connect(mapStateToProps, mapDispatchToProps )(AnecdoteList)