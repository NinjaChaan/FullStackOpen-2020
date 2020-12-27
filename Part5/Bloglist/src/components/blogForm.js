import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ onCreateBlog, setBlogFormVisible }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const create = (event) => {
    event.preventDefault()
    onCreateBlog(title, author, url)
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
  setBlogFormVisible: PropTypes.func.isRequired,
  onCreateBlog: PropTypes.func.isRequired
}

export default BlogForm