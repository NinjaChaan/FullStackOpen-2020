import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/blogForm'
import Login from './components/loginform'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [name, setName] = useState('')
  const [user, setUser] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [message, setMessage] = useState('')
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    if (window.localStorage.getItem('user')) {
      setLoggedIn(true)
      setName(window.localStorage.getItem('name'))
      setUser(window.localStorage.getItem('user'))
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  const logout = () => {
    window.localStorage.removeItem('name')
    window.localStorage.removeItem('user')
    setLoggedIn(false)
  }

  const updateBlog = (newBlog) => {
    setBlogs(blogs.map((x) => {
      if (x.id === newBlog.id) {
        return newBlog
      } else {
        return x
      }
    }))
  }
  
  return (
    <div>
      {!loggedIn ? (
        <Login setLoggedIn={setLoggedIn} setName={setName} setUser={setUser} />
      ) : (
        <div>
          <h2>blogs</h2>
          {message !== '' && (
            <div>
              <span>{message}</span>
              <br />
              <br />
            </div>
          )}
          <span>{name} logged in</span>
          <button onClick={logout}>logout</button>
          <br />
          <br />
          <button onClick={() => setBlogFormVisible(true)}>new note</button>
          {blogs && blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
          )}
          {blogFormVisible && (
            <BlogForm setBlogFormVisible={setBlogFormVisible} setMessage={setMessage} setBlogs={setBlogs} user={user} />
          )}
        </div>
      )}

    </div>
  )
}

export default App