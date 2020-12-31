import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'

const BlogForm = ({ setBlogFormVisible }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.token)

  const create = (event) => {
    event.preventDefault()
    dispatch(createBlog(title, author, url, user))
    setBlogFormVisible(false)
    dispatch(createNotification(`created blog ${title} by ${author}`, 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <span>title:</span>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}>
        </input>
        <br />
        <span>author:</span>
        <input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}>
        </input>
        <br />
        <span>url:</span>
        <input
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}>
        </input>
        <br />
        <button id="create" type={'submit'}>create</button>
      </form>
      <button onClick={() => setBlogFormVisible(false)}>cancel</button>
    </div>
  )
}

BlogForm.propTypes = {
  setBlogFormVisible: PropTypes.func.isRequired
}

export default BlogForm