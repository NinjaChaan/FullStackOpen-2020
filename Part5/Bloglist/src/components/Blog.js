import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog }) => {
  const [showInfo, setShowInfo] = useState(false)

  const likeBlog = () => {
    blogService.like(blog.id, blog.likes + 1).then((response) => {
      console.log(response)
      updateBlog(response.data)
    })
  }

  return (
    <div>
      {blog.title} {blog.author}
      <button onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'hide' : 'show'}</button>
      {showInfo && (<>
        <div>{blog.info}</div>
        <div>likes {blog.likes} <button onClick={likeBlog}>liek</button></div>
        <div>{(blog.user && blog.user.name) || 'No user'}</div>
      </>)}
    </div>
  )
}

export default Blog
