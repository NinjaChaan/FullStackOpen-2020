const bcrypt = require('bcryptjs')
const testingRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('../tests/test_helper')

testingRouter.post('/reset', async (request, response) => {
	await Blog.deleteMany({})
	await User.deleteMany({})

	const saltRounds = 10
	const passwordHash = await bcrypt.hash('salasana', saltRounds)

	const user = new User({
		username: 'fox',
		name: 'Fox Foxington',
		passwordHash,
	})

	const savedUser = await user.save()

	for (let blog of helper.initialBlogs) {
		blog.user = savedUser._id
		const blogObject = new Blog(blog)
		await blogObject.save()
	}

	response.json(savedUser.toJSON())
})

testingRouter.get('/', async (request, response) => {
	response.status(200).json({ status: 'ok' })
})

module.exports = testingRouter
