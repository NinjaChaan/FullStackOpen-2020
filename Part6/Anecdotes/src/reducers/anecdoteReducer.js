import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0
	}
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
	console.log('state now: ', state)
	console.log('action', action)

	switch (action.type) {
		case 'VOTE':
			return state.map((x) => {
				if (x.id === action.data.id) {
					return {
						...x,
						votes: action.data.votes
					}
				} else {
					return x
				}
			}).sort((a, b) => {
				return b.votes - a.votes
			})
		case 'CREATE_NEW':
			return state.concat(action.data)
		case 'INIT_ANECDOTES':
			return action.data.anecdotes.sort((a, b) => {
				return b.votes - a.votes
			})
		default:
			break;
	}

	return state
}

export const voteAnecdote = (id, newVotes) => {
	return async dispatch => {
		await anecdoteService.updateVotes(id, newVotes)
		dispatch({
			type: 'VOTE',
			data: { id, votes: newVotes }
		})
	}
}

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: 'INIT_ANECDOTES',
			data: { anecdotes }
		})
	}
}

export const createAnecdote = (content) => {
	return async dispatch => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch({
			type: 'CREATE_NEW',
			data: newAnecdote
		})
	}
}

export default reducer