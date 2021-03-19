import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../store/actions/auth'

const Sidebar = ({ user, history }) => {
	const dispatch = useDispatch()

	const handleLogout = () => {
		dispatch(logoutUser())
		if (user.data === null) history.push('/logout')
	}

	return (
		<div className='col-lg-4 mb-4 mb-lg-0'>
			<div className='bg-light rounded-3 shadow-lg'>
				<div className='px-4 py-4 mb-1 text-center'>
					<div className='mx-auto my-2 lead'>
						<i
							className='ai-user'
							style={{ fontSize: '1.5em' }}
						></i>
					</div>

					<h6 className='mb-0 pt-1'>{user.data.name}</h6>
				</div>
				<div className='d-lg-none px-4 pb-4 text-center'>
					<a
						className='btn btn-primary px-5 mb-2'
						href='#account-menu'
						data-bs-toggle='collapse'
					>
						<i className='ai-menu me-2'></i>Account menu
					</a>
				</div>
				<div className='d-lg-block collapse pb-2' id='account-menu'>
					<h3 className='d-block bg-secondary fs-sm fw-semibold text-muted mb-0 px-4 py-3'>
						Dashboard
					</h3>
					<NavLink
						className='d-flex align-items-center nav-link-style px-4 py-3'
						activeClassName='active'
						exact
						to='/'
					>
						<i className='ai-home fs-lg opacity-60 me-2'></i>
						Dashboard
					</NavLink>
					<NavLink
						className='d-flex align-items-center nav-link-style px-4 py-3'
						activeClassName='active'
						exact
						to='/books'
					>
						<i className='ai-book fs-lg opacity-60 me-2'></i>
						Books
					</NavLink>
					<NavLink
						className='d-flex align-items-center nav-link-style px-4 py-3'
						activeClassName='active'
						exact
						to='/authors'
					>
						<i className='ai-users fs-lg opacity-60 me-2'></i>
						Authors
					</NavLink>
					<h3 className='d-block bg-secondary fs-sm fw-semibold text-muted mb-0 px-4 py-3'>
						Account
					</h3>
					<button
						className='d-flex align-items-center nav-link-style px-4 py-3 btn'
						onClick={handleLogout}
					>
						<i className='ai-log-out fs-lg opacity-60 me-2'></i>
						Sign out
					</button>
				</div>
			</div>
		</div>
	)
}

export default Sidebar
