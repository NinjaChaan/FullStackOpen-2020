import blogService from '../services/blogs'

const initialState = []

const reducer = (state = initialState, action) => {

	switch (action.type) {
		case 'BLOG_INIT':
			return action.data
		case 'BLOG_CREATE':
			return state.concat(action.data)
		case 'BLOG_REMOVE':
			return state.filter((blog) => blog.id !== action.data.id)
		case 'BLOG_LIKE':
			return state.map((blog) => {
				if(blog.id === action.data.id){
					return {
						...blog,
						likes: action.data.likes
					}
				}
				return blog
			})
		default:
			break
	}

	return state
}

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'BLOG_INIT',
			data: blogs
		})
	}
}

export const createBlog = (title, author, url, user) => {
	return async dispatch => {
		const newBlog = await blogService.create(title, author, url, user)
		dispatch({
			type: 'BLOG_CREATE',
			data: newBlog.data
		})
	}
}

export const removeBlog = (id) => {
	return async dispatch => {
		await blogService.remove(id)
		dispatch({
			type: 'BLOG_REMOVE',
			data: { id }
		})
	}
}

export const likeBlog = (id, newLikes) => {
	return async dispatch => {
		await blogService.like(id, newLikes)
		dispatch({
			type: 'BLOG_LIKE',
			data: { id, likes: newLikes }
		})
	}
}

export default reducer