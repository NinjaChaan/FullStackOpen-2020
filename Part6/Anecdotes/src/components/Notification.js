import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
	const dispatch = useDispatch()
	const notification = useSelector(state => state.notification.content)
	const time = useSelector(state => state.notification.time)

	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	}

	useEffect(() => {
		const myTimeout = setTimeout(() => {
			dispatch(clearNotification())
		}, time * 1000);
		return () => {
			clearTimeout(myTimeout)
		}
	}, [notification, time, dispatch])

	if (notification !== undefined) {
		return (
			<div style={style}>
				{notification}
			</div>
		)
	} else {
		return <></>
	}

}

export default Notification