import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data).catch((error) => (error.response))
}

const create = (title, author, url, user) => {
	const request = axios.post(baseUrl, { title, author, url }, {
		headers: {
			Authorization: `Bearer ${user}`
		}
	})
	return request.then(response => response).catch((error) => (error.response))
}

const update = (id, blog) => {
	const request = axios.put(`${baseUrl}/${id}`, blog)
return request.then(response => response).catch((error) => (error.response))
}

const remove = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`)
	return request.then(response => response).catch((error) => (error.response))
}

const like = (id, newLikes) => {
	const request = axios.put(`${baseUrl}/${id}`, { likes: newLikes })
	return request.then(response => response).catch((error) => (error.response))
}
export default { getAll, create, like, remove, update }