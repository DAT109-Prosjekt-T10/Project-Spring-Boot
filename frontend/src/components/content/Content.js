import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from './Sidebar'
import Dashboard from './dashboard/Dashboard'
import Books from './books/Books'
import Authors from './authors/Authors'

const Content = ({ match }) => {
	const user = useSelector((state) => state.user)
	const currentUrl = match.path
	return (
		<div
			className='container position-relative zindex-0 pb-4 mb-md-3'
			style={{ marginTop: '-350px' }}
		>
			<div className='row'>
				<Sidebar user={user} />
				{currentUrl === '/' && <Dashboard />}
				{currentUrl === '/books' && <Books />}
				{currentUrl === '/authors' && <Authors />}
			</div>
		</div>
	)
}

export default Content
