import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/blogForm'
import Login from './components/loginform'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification, clearNotification } from './reducers/notificationReducer'
import { setUser, logOutUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs.sort((a, b) => a.likes < b.likes ? 1 : -1))
  const loggedIn = useSelector(state => state.user.loggedIn)
  const name = useSelector(state => state.user.name)
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification.content)
  const time = useSelector(state => state.notification.time)

  useEffect(() => {
    if (window.localStorage.getItem('user')) {
      dispatch(setUser(window.localStorage.getItem('user'), window.localStorage.getItem('name')))
    }
    dispatch(initializeBlogs())
  }, [])

  const logout = () => {
    window.localStorage.removeItem('name')
    window.localStorage.removeItem('user')
    dispatch(logOutUser())
  }

  useEffect(() => {
    const myTimeout = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
    return () => {
      clearTimeout(myTimeout)
    }
  }, [notification, time, dispatch])

  return (
    <div>
      {!loggedIn ? (
        <div>
          {notification !== undefined && (
            <div>
              <span>{notification}</span>
              <br />
              <br />
            </div>
          )}
          <Login />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          {notification !== undefined && (
            <div>
              <span>{notification}</span>
              <br />
              <br />
            </div>
          )}
          <span>{name} logged in</span>
          <button onClick={logout}>logout</button>
          <br />
          <br />
          <button onClick={() => setBlogFormVisible(true)}>new blog</button>
          {blogs && blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          {blogFormVisible && (
            <BlogForm setBlogFormVisible={setBlogFormVisible} />
          )}
        </div>
      )}

    </div>
  )
}

export default App