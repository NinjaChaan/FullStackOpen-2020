import React, { useState } from 'react'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import blogService from '../services/blogs'
import { Button, TextField, ListItem } from './Styles'

const Blog = ({ blog }) => {
	const dispatch = useDispatch()
	const [comments, setComments] = useState(blog.comments)
	const [comment, setComment] = useState("")

	const like = () => {
		dispatch(likeBlog(blog.id, blog.likes + 1))
	}

	const addComment = (event) => {
		event.preventDefault()
		const updatedBlog = {
			...blog,
			comments: comments ? comments.concat(comment) : [comment]
		}
		blogService.update(blog.id, updatedBlog).then(response => {
			console.log(response.data)
			if (response.status === 200) {
				setComments(response.data.comments)
			}
		})

	}

	return (
		<div className="blogHolder">
			<h1> {blog.title} {blog.author}</h1>
			<div>{blog.info}</div>
			<div className="likesfield">likes {blog.likes} <Button onClick={like}>like</Button></div>
			<div>{(blog.user && blog.user.name) || 'No user'}</div>
			<div>{`added by ${blog.user.name}`}</div>
			<h2>comments</h2>
			<form onSubmit={addComment}>
				<TextField
					id="comment"
					value={comment}
					onChange={(e) => setComment(e.target.value)}></TextField>
				<Button onClick={addComment}>add comment</Button>
			</form>
			{comments && comments.map((comment, i) =>
				<ListItem even={i % 2 == 0}>{comment}</ListItem>
			)}
		</div>
	)
}

export default Blog
