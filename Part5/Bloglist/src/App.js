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

  const onLikeBlog = (blog) => {
    blogService.like(blog.id, blog.likes + 1).then((response) => {
      console.log(response)
      const newBlog = response.data
      setBlogs(blogs.map((x) => {
        if (x.id === newBlog.id) {
          return {
            ...x,
            likes: newBlog.likes
          }
        } else {
          return x
        }
      }))
    })
  }

  const onRemoveBlog = (blog) => {
    blogService.remove(blog.id).then((response) => {
      console.log(response)
      setBlogs(blogs.filter((item) => item.id !== blog.id))
    })
  }

  const onCreateBlog = (title, author, url) => {
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
            <button onClick={() => setBlogFormVisible(true)}>new blog</button>
            {blogs && blogs.sort((a, b) => a.likes < b.likes ? 1 : -1).map(blog =>
              <Blog key={blog.id} blog={blog} onLikeBlog={onLikeBlog} onRemoveBlog={onRemoveBlog} />
            )}
            {blogFormVisible && (
              <BlogForm onCreateBlog={onCreateBlog} setBlogFormVisible={setBlogFormVisible} />
            )}
          </div>
        )}

    </div>
  )
}

export default App