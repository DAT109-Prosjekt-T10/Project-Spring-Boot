import React, { useState, useEffect } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../store/actions/auth'
import { getUserByToken } from '../../helpers/auth'
import logo from '../assets/images/logo-libsys.png'

const Header = () => {
	const user = useSelector((state) => state.user)

	const [loggedInUser, setLoggedInUser] = useState(null)

	useEffect(() => {
		setLoggedInUser(
			getUserByToken(user.data) ||
				getUserByToken(localStorage.getItem('user'))
		)
	}, [user])

	const dispatch = useDispatch()

	const history = useHistory()

	const handleLogout = () => {
		dispatch(logoutUser())
		history.push('/login')
	}

	return (
		<header className='header navbar navbar-expand-lg navbar-dark bg-gradient navbar-floating navbar-sticky'>
			<div className='container px-0 px-xl-3'>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarCollapse1'
				>
					<span className='navbar-toggler-icon'></span>
				</button>
				<Link
					className='navbar-brand order-lg-1 me-0 pe-lg-2 me-lg-4 mt-1'
					to='/'
				>
					<img
						className='navbar-floating-logo d-none d-lg-block'
						src={logo}
						alt='OddsNotifier'
						width='153'
					/>
					<img
						className='d-lg-none'
						src={logo}
						alt='OddsNotifier'
						width='153'
					/>
				</Link>
				{loggedInUser ? (
					<div className='d-flex align-items-center order-lg-3 ms-lg-auto'>
						<div className='navbar-tool dropdown'>
							<div className='navbar-tool-icon-box'>
								<i className='ai-user'></i>
							</div>
							<Link
								className='navbar-tool-label dropdown-toggle'
								to='/'
							>
								<small>Hello,</small>
								{loggedInUser.name}
							</Link>
							<ul
								className='dropdown-menu dropdown-menu-end'
								style={{ width: '15rem' }}
							>
								<li>
									<Link
										className='dropdown-item d-flex align-items-center'
										to='/'
										exact
									>
										<i className='ai-box font-size-base opacity-60 me-2'></i>
										Dashboard
									</Link>
								</li>
								<li className='dropdown-divider'></li>
								<li>
									<button
										className='dropdown-item d-flex align-items-center mt-2'
										onClick={handleLogout}
									>
										<i className='ai-log-out font-size-base opacity-60 me-2'></i>
										Sign out
									</button>
								</li>
							</ul>
						</div>
					</div>
				) : (
					<div className='d-flex align-items-center order-lg-3 ms-lg-auto'>
						<Link
							className='nav-link-style fs-sm text-nowrap'
							to='/login'
						>
							<i className='ai-user fs-xl me-2 align-middle'></i>
							Sign in
						</Link>
						<Link
							className='btn btn-primary ms-grid-gutter d-none d-lg-inline-block'
							to='/register'
						>
							Sign up
						</Link>
					</div>
				)}
				<div
					className='collapse navbar-collapse order-lg-2'
					id='navbarCollapse1'
				>
					<ul className='navbar-nav me-auto'>
						<li className='nav-item'>
							<NavLink
								className='nav-link'
								to='/'
								exact
								activeClassName='active'
							>
								Dashboard
							</NavLink>
						</li>
					</ul>
				</div>
			</div>
		</header>
	)
}

export default Header
