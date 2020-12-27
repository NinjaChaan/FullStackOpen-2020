import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, onLikeBlog, onRemoveBlog }) => {
  const [showInfo, setShowInfo] = useState(false)

  const likeBlog = () => {
    onLikeBlog(blog)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      blogService.remove(blog.id).then((response) => {
        console.log(response)
        onRemoveBlog(blog)
      })
    }
  }

  return (
    <div className="blogHolder">
      {blog.title} {blog.author}
      <button className="show" onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'hide' : 'show'}</button>
      {showInfo && (<>
        <div>{blog.info}</div>
        <div className="likesfield">likes {blog.likes} <button onClick={likeBlog}>like</button></div>
        <div>{(blog.user && blog.user.name) || 'No user'}</div>
        <button onClick={removeBlog}>remove</button>
      </>)}
    </div>
  )
}

export default Blog
