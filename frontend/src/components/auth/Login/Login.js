import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
	//* form elements
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [hidePassword, setHidePassword] = useState(true)

	const handleSubmit = (e) => {
		e.preventDefault()

		// log in with action

		// redirect to dashboard

		// if error, set error
	}

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
							<form
								className='needs-validation'
								onSubmit={handleSubmit}
							>
								<div class='input-group mb-3'>
									<i class='ai-mail position-absolute top-50 start-0 translate-middle-y ms-3'></i>
									<input
										class='form-control rounded'
										type='email'
										placeholder='Email'
										required
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</div>
								<div class='input-group mb-4'>
									<i class='ai-lock position-absolute top-50 start-0 translate-middle-y ms-3'></i>
									<div class='password-toggle w-100'>
										<input
											class='form-control'
											type={
												hidePassword
													? 'password'
													: 'text'
											}
											placeholder='Password'
											required
											onChange={(e) =>
												setPassword(e.target.value)
											}
										/>
										<label
											class='password-toggle-btn'
											aria-label='Show/hide password'
										>
											<input
												class='password-toggle-check'
												type='checkbox'
												onClick={() =>
													setHidePassword(
														!hidePassword
													)
												}
											/>
											<span class='password-toggle-indicator'></span>
										</label>
									</div>
								</div>
								{false && ( //! change to login reducer error
									<div
										className='alert alert-danger'
										role='alert'
									>
										Invalid email or password
									</div>
								)}
								<br />
								<button
									className='btn btn-primary d-block w-100'
									type='submit'
									disabled={false} //! change to login reducer loading
								>
									Sign in
								</button>
							</form>
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
