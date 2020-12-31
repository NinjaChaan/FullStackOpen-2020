import React, { useState } from 'react'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
  const [showInfo, setShowInfo] = useState(false)
  const dispatch = useDispatch()

  const like = () => {
    dispatch(likeBlog(blog.id, blog.likes + 1))
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      dispatch(removeBlog(blog.id))
    }
  }

  return (
    <div className="blogHolder">
      {blog.title} {blog.author}
      <button className="show" onClick={() => setShowInfo(!showInfo)}>{showInfo ? 'hide' : 'show'}</button>
      {showInfo && (<>
        <div>{blog.info}</div>
        <div className="likesfield">likes {blog.likes} <button onClick={like}>like</button></div>
        <div>{(blog.user && blog.user.name) || 'No user'}</div>
        <button onClick={remove}>remove</button>
      </>)}
    </div>
  )
}

export default Blog
