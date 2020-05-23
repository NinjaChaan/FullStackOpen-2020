const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)


beforeEach(async () => {
	await Blog.deleteMany({})
	for (let blog of helper.initialBlogs) {
		const blogObject = new Blog(blog)
		await blogObject.save()
	}
})

test('correct amount of blogs are returned as json', async () => {
	const response = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)

	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier is id', async () => {
	const response = await api
		.get('/api/blogs')

	expect(response.body[0].id).toBeDefined()
})

describe('http post', () => {

	test('creates a blog post', async () => {
		const newBlog = {
			title: 'Wikipedia',
			author: 'Wikipedia Contributors',
			url: 'https://wikipedia.com/',
			likes: 1000
		}

		const response = await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

		const titles = blogsAtEnd.map(b => b.title)
		expect(titles).toContain(newBlog.title)
	})

	test('defaults likes to 0', async () => {
		const newBlog = {
			title: 'Wikipedia',
			author: 'Wikipedia Contributors',
			url: 'https://wikipedia.com/'
		}

		const response = await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAtEnd = await helper.blogsInDb()

		const likes = blogsAtEnd.map(b => ({ title: b.title, likes: b.likes }))
		expect(likes).toContainEqual({ title: 'Wikipedia', likes: 0 })
	})

	test('title missing 400', async () => {
		const newBlog = {
			author: 'Wikipedia Contributors',
			url: 'https://wikipedia.com/'
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	})

	test('url missing 400', async () => {
		const newBlog = {
			title: 'Wikipedia',
			author: 'Wikipedia Contributors',
		}

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(400)

		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
	})
})

test('delete deletes', async () => {
	const toDeleteId = helper.initialBlogs[0]._id

	await api
		.delete(`/api/blogs/${toDeleteId}`)
		.expect(204)

	const blogsAtEnd = await helper.blogsInDb()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
})

test('update likes', async () => {
	const toUpdateId = helper.initialBlogs[0]._id

	const updated = {
		likes: 1234
	}
	const response = await api
		.put(`/api/blogs/${toUpdateId}`)
		.send(updated)
		.expect(200)
		.expect('Content-Type', /application\/json/)

	expect(response.body.likes).toBe(1234)
})


afterAll(() => {
	mongoose.connection.close()
})