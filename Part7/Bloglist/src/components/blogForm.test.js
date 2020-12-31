import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './blogForm'

const testBlog = {
  title: 'A blog for testing',
  author: 'Test author',
  url: 'www.blog.com'
}

test('Submits form', () => {
  const mockHandler = jest.fn()
  const component = render(
    <BlogForm onCreateBlog={mockHandler} setBlogFormVisible={(bool)=>{}} />
  )

  const form = component.container.querySelector('form')
  const author = form.querySelector('#author')
  const title = form.querySelector('#title')
  const url = form.querySelector('#url')

  fireEvent.change(author, {
    target: { value: testBlog.author }
  })
  fireEvent.change(title, {
    target: { value: testBlog.title }
  })
  fireEvent.change(url, {
    target: { value: testBlog.url }
  })
  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toBe(testBlog.title)
  expect(mockHandler.mock.calls[0][1]).toBe(testBlog.author)
  expect(mockHandler.mock.calls[0][2]).toBe(testBlog.url)
})