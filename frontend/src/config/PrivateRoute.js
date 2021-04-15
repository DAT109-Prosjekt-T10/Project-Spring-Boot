import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isValidToken } from '../helpers/auth'

export default function PrivateRoute({ component: Component, ...rest }) {
	const token = localStorage.getItem('user')

	return (
		<Route
			{...rest}
			render={(props) => {
				return token && isValidToken(token) ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				)
			}}
		></Route>
	)
}
