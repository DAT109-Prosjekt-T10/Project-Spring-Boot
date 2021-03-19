import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser } from '../../../store/actions/auth'
import RegisterForm from './RegisterForm'
import Spinner from '../../ui/Spinner'

const Register = ({ history }) => {
	//* initialize dispatcher
	const dispatch = useDispatch()

	//* user reducer
	const user = useSelector((state) => state.user)

	//* method to register user
	const handleRegister = (userObj) => {
		dispatch(registerUser(userObj))
	}

	//* if user is authenticated, redirect to dashboard
	useEffect(() => {
		if (user.data) {
			history.push('/')
		}
	}, [user, history])

	return (
		<div
			className='container position-relative zindex-0 pb-4 mb-md-3'
			style={{ marginTop: '-450px' }}
		>
			<section
				className='container d-flex justify-content-center align-items-center pt-7 pb-4'
				style={{ flex: '1 0 auto' }}
			>
				<div className='signin-form mt-3'>
					<div className='signin-form-inner rounded-3 shadow-lg'>
						<div className='view show' id='signin-view'>
							<h1 className='h2 text-center'>Sign up</h1>
							<p className='fs-ms text-muted mb-4 text-center'>
								Registration takes less than a minute.
							</p>
							{user.loading ? (
								<Spinner />
							) : (
								<>
									{user.error &&
										//* appears when register reducer sees an error
										(user.error.includes('409') ? (
											<div
												className='alert alert-danger'
												role='alert'
											>
												Email already exists.
											</div>
										) : (
											<div
												className='alert alert-danger'
												role='alert'
											>
												An error occured.
											</div>
										))}
									<RegisterForm
										handleRegister={(userObj) =>
											handleRegister(userObj)
										}
									/>
								</>
							)}
						</div>
						<div className='border-top text-center mt-4 py-4'>
							<p className='fs-sm mb-0 text-center'>
								Already have an account?{' '}
								<Link to='/login' className='fw-medium'>
									Sign in
								</Link>
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Register
