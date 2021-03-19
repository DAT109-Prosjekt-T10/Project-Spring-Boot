import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
	//* form utils
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	//* submit handler
	const onSubmit = (e) => {
		e.preventDefault()

		let user = {
			email,
			password,
		}

		handleLogin(user)
	}

	return (
		<form className='needs-validation' noValidate onSubmit={onSubmit}>
			<div className='form-floating mb-3'>
				<input
					type='email'
					className='form-control'
					id='email'
					placeholder='Email'
					required
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor='email'>Email</label>
			</div>
			<div className='form-floating mb-3'>
				<input
					type='password'
					className='form-control'
					id='password'
					placeholder='Password'
					required
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label htmlFor='password'>Password</label>
			</div>
			<br />
			<button
				className='btn btn-primary d-block w-100'
				type='submit'
				disabled={false} //! change to login reducer loading
			>
				Sign in
			</button>
		</form>
	)
}

export default LoginForm
