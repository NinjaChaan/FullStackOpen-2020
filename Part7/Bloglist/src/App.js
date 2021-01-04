import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/blogForm'
import Login from './components/loginform'
import { useDispatch, useSelector } from 'react-redux'
import { createNotification, clearNotification } from './reducers/notificationReducer'
import styled from 'styled-components'
import { Button, ListItem } from './components/Styles'
import { setUser, logOutUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
	BrowserRouter as Router,
	Switch, Route, Link, useRouteMatch
} from "react-router-dom"

const NavBackground = styled.div`
	background-color: cornflowerblue;
	padding: 5px;
	border-radius: 4px;
`

const StyledLink = styled(Link)`
	font-weight: bold;
	text-decoration: none;
	font-size: large;
`

const NavLink = styled(StyledLink)`
	color: white;
	padding-right: 10px;

	&:hover{
		color: orange;
	}
`

const Notification = styled.div`
	background-color: ${(props) =>
		(props.success && 'lightgreen') || 'indianred'
	};
	padding: 20px;
	border-radius: 4px;
	font-size: large;
	font-weight: bold;
`

const App = () => {
	const blogs = useSelector(state => state.blogs.sort((a, b) => a.likes < b.likes ? 1 : -1))
	const users = useSelector(state => state.users)
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
		dispatch(initializeUsers())
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

	const User = () => {
		const match = useRouteMatch('/users/:id')

		const selectedUser = (match
			? users.find(user => user.id === (match.params.id))
			: null)

		if (users.length < 1) {
			setTimeout(() => {
			}, 1000);
			return (null)
		}
		else {
			return (
				<div>
					<h2>{selectedUser.name}</h2>
					<h3>added blogs</h3>
					{selectedUser.blogs && selectedUser.blogs.map((blog, i) =>
						<ListItem even={i % 2 == 0}>{blog.title}</ListItem>
					)}
				</div>
			)
		}
	}

	const SelectedBlog = () => {
		const match = useRouteMatch('/blogs/:id')

		const selectedBlog = (match
			? blogs.find(blog => blog.id === (match.params.id))
			: null)

		if (blogs.length < 1) {
			setTimeout(() => {
			}, 1000);
			return (null)
		}
		else {
			return (
				<div>
					<Blog key={selectedBlog.id} blog={selectedBlog} />
				</div>
			)
		}
	}

	const NavBar = () => {
		return (
			<NavBackground >
				<NavLink to={`/blogs`}> <span>blogs </span></NavLink>
				<NavLink to={`/users`}> <span>users</span></NavLink>
				<span>{name} logged in</span>&emsp;
				<Button onClick={logout}>logout</Button>
			</NavBackground>
		)
	}

	return (
		<div>
			<Router>
				<Switch>
					{!loggedIn ? (
						<div>
							{notification !== undefined && (
								<Notification>{notification}</Notification>
							)}
							<Login />
						</div>
					) : (
							<div>
								<NavBar />
								<h2>blogs</h2>
								{notification !== undefined && (
									<Notification success>{notification}</Notification>
								)}
								<br />
								<br />
								<Route path="/users/:id">
									<User></User>
								</Route>
								<Route exact path="/users">
									<div>
										<h2>users</h2>
										<table>
											<tbody>
												<tr>
													<th></th>
													<th>blogs created</th>
												</tr>
												{users && users.map((user, i) =>
													<tr>
														<ListItem even={i % 2 == 0}>
															<StyledLink to={`/users/${user.id}`}>{user.name}</StyledLink>
														</ListItem>
														<td>{user.blogs.length}</td>
													</tr>
												)}
											</tbody>
										</table>
									</div>
								</Route>
								<Route path="/blogs/:id">
									<SelectedBlog></SelectedBlog>
								</Route>
								<Route exact path={["/blogs", "/"]}>
									<div>
										<Button onClick={() => setBlogFormVisible(true)}>new blog</Button>
										{blogs && blogs.map((blog, i) =>
											<ListItem even={i % 2 == 0} >
												<StyledLink to={`/blogs/${blog.id}`}> {blog.title} {blog.author}</StyledLink>
												<br />
											</ListItem>

										)}
										{blogFormVisible && (
											<BlogForm setBlogFormVisible={setBlogFormVisible} />
										)}
									</div>
								</Route>
							</div>
						)}
				</Switch>
			</Router>
		</div >
	)
}

export default App