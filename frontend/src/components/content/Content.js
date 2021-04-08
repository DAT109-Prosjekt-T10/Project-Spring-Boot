import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUserByToken } from '../../helpers/auth'
import Sidebar from './Sidebar'
import Dashboard from './dashboard/Dashboard'
import Books from './books/Books'
import Authors from './authors/Authors'

const Content = ({ match, history }) => {
	const user = useSelector((state) => state.user)

	const [loggedInUser, setLoggedInUser] = useState(null)

	useEffect(() => {
		setLoggedInUser(
			getUserByToken(user.data) ||
				getUserByToken(localStorage.getItem('user'))
		)
	}, [user])

	const currentUrl = match.path
	return (
		loggedInUser && (
			<div
				className='container position-relative zindex-0 pb-4 mb-md-3'
				style={{ marginTop: '-350px' }}
			>
				<div className='row'>
					<Sidebar user={loggedInUser} history={history} />
					{currentUrl === '/' && <Dashboard history={history} />}
					{currentUrl === '/books' && <Books user={loggedInUser} />}
					{currentUrl === '/authors' && (
						<Authors user={loggedInUser} history={history} />
					)}
					{currentUrl === '/' && <Dashboard />}
					{currentUrl === '/books' && <Books user={loggedInUser} />}
					{currentUrl === '/authors' && <Authors />}
				</div>
			</div>
		)
	)
}

export default Content
