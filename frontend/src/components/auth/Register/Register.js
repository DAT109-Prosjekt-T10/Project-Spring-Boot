import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from './RegisterForm'

const Register = () => {
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
							<h1 className='h2 text-center'>Sign up</h1>
							<p className='fs-ms text-muted mb-4 text-center'>
								Registration takes less than a minute.
							</p>
							<RegisterForm />
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
