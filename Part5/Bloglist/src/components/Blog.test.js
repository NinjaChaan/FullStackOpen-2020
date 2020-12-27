import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const testBlog = {
  title: 'A blog for testing',
  author: 'Test author',
  likes: 99,
  info: 'www.blog.com',
  user: {
    name: 'Test User'
  }
}

test('renders content', () => {

  const component = render(
    <Blog blog={testBlog} />
  )

  expect(component.container).toHaveTextContent(
    `${testBlog.title} ${testBlog.author}`
  )
})

test('renders extra content when button pressed', () => {

  const component = render(
    <Blog blog={testBlog} />
  )

  const button = component.getByText('show')

  expect(button).toBeDefined()

  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    `${testBlog.title} ${testBlog.author}`
  )
  expect(component.container).toHaveTextContent(
    testBlog.info
  )
  expect(component.container).toHaveTextContent(
    `likes ${testBlog.likes}`
  )
  expect(component.container).toHaveTextContent(
    testBlog.user.name
  )
})

test('onLikeBlog is called when like is pressed', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={testBlog} onLikeBlog={mockHandler} />
  )

  const showButton = component.getByText('show')

  expect(showButton).toBeDefined()

  fireEvent.click(showButton)

  const likeButton = component.getByText('like')

  expect(likeButton).toBeDefined()

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})