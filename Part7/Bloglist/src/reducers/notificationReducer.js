const initialState = {}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'NOTIFY':
			return { content: action.data.content, time: action.data.time }
		case 'CLEAR_NOTIFICATION':
			return {}
		default:
			break;
	}

	return state
}

export const createNotification = (content, time) => {
	return {
		type: 'NOTIFY',
		data: { content, time }
	}
}

export const clearNotification = () => {
	return {
		type: 'CLEAR_NOTIFICATION'
	}
}

export default reducer

