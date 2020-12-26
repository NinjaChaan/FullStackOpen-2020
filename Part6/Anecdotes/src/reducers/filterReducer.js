const initialState = ""

const reducer = (state = initialState, action) => {
	console.log('state now: ', state)
	console.log('action', action)

	switch (action.type) {
		case 'CHANGE_FILTER':
			return action.data.filter
		default:
			break;
	}

	return state
}

export const changeFilter = (filter) => {
	return {
		type: 'CHANGE_FILTER',
		data: { filter }
	}
}

export default reducer