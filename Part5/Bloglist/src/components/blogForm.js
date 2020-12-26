import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const BlogForm = ({ setBlogFormVisible, setMessage, setBlogs, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const create = () => {
    blogService.create(title, author, url, user).then(response => {
      console.log(response)
      if (response.status === 201) {
        setMessage(`a new blog ${title} by ${author} added`)
      } else {
        setMessage(response.status)
      }
    }
    )
    setBlogFormVisible(false)
    setTimeout(() => {
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }, 1000)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <span>title:</span>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}>
      </input>
      <br />
      <span>author:</span>
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}>
      </input>
      <br />
      <span>url:</span>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}>
      </input>
      <br />
      <button onClick={create}>create</button>
      <button onClick={() => setBlogFormVisible(false)}>cancel</button>
    </div>
  )
}

BlogForm.propTypes = {
  setBlogFormVisible: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
}

export default BlogForm