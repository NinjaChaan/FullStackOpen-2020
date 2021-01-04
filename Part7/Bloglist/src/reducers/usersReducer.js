import userService from '../services/users'

const initialState = []

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'USER_INIT':
			return action.data
		default:
			break;
	}

	return state
}

export const initializeUsers = () => {
	return async dispatch => {
		const users = await userService.getAll()
		dispatch({
			type: 'USER_INIT',
			data: users
		})
	}
}

export default reducer
