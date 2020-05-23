const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((sum, next) => sum + next.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((left, right) => {
	return (left != null && left.likes > right.likes)
		? left
		: right
}, null)

const mostBlogs = (blogs) => {
	const grouped = _.groupBy(blogs, (x) => x.author)
	const entries = Object.entries(grouped)
	const authorBlogs = entries
		.map((entry) => {
			return {
				author: entry[0],
				blogs: entry[1].length
			}
		})
	return _.maxBy(authorBlogs, (ab) => ab.blogs)
}

const mostLikes = (blogs) => {
	const grouped = _.groupBy(blogs, (x) => x.author)
	const entries = Object.entries(grouped)
	const authorBlogs = entries
		.map((entry) => {
			return {
				author: entry[0],
				likes: totalLikes(entry[1])
			}
		})
	return _.maxBy(authorBlogs, (ab) => ab.likes)
}


module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
