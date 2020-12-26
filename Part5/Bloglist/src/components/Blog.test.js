import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: '',
    author: ''
  }

  const component = render(
    <Blog blog={blog} />
  )
  //TODO
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})