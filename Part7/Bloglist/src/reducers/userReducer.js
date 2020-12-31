const initialState = {
	loggedIn: false
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_USER':
			return {
				loggedIn: true,
				token: action.data.token,
				name: action.data.name
			}
		case 'LOGOUT':
			return initialState
		default:
			break;
	}

	return state
}

export const setUser = (token, name) => {
	return {
		type: 'SET_USER',
		data: { token, name }
	}
}

export const logOutUser = () => {
	return {
		type: 'LOGOUT'
	}
}

export default reducer
