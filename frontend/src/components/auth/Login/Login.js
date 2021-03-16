import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'

const Login = () => {
	return (
		<div
			className='container position-relative zindex-0 pb-4 mb-md-3'
			style={{ marginTop: '-350px' }}
		>
			<section
				className='container d-flex justify-content-center align-items-center pt-7 pb-4'
				style={{ flex: '1 0 auto' }}
			>
				<div className='signin-form mt-3'>
					<div className='signin-form-inner rounded-3 shadow-lg'>
						<div className='view show' id='signin-view'>
							<h1 className='h2 text-center'>Sign in</h1>
							<p className='fs-ms text-muted mb-4 text-center'>
								Sign in to your account using email and
								password.
							</p>
							<LoginForm />
						</div>
						<div class='border-top text-center mt-4 py-4'>
							{' '}
							<p className='fs-sm mb-0 text-center'>
								Don't have an account?{' '}
								<Link to='/register' className='fw-medium'>
									Sign up
								</Link>
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Login
