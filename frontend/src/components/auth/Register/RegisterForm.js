import React, { useState, useEffect } from 'react'
import {
	isRegisterFormValid,
	checkRegisterFormValidity,
} from '../../../helpers/validate'

const RegisterForm = ({ handleRegister }) => {
	//* form utils
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const [checkFormValidity, setCheckFormValidity] = useState(false)

	//* submit handler
	const onSubmit = (e) => {
		e.preventDefault()

		//* checks if form is valid
		if (isRegisterFormValid(name, email, password, confirmPassword)) {
			//? register user
			let user = {
				name,
				email,
				password,
				//? admin: if admin input field is equal, set as true
			}

			//* clear form
			resetForm()

			//* send back user object to Register component and do the logic there
			handleRegister(user)
		} else {
			//* check form validation
			setCheckFormValidity(true)
		}
	}

	//* after submit, check actively for form changes
	useEffect(() => {
		if (checkFormValidity) {
			checkRegisterFormValidity(
				document,
				name,
				email,
				password,
				confirmPassword
			)
		}
	}, [
		checkFormValidity,
		name,
		setName,
		email,
		setEmail,
		password,
		setPassword,
		confirmPassword,
		setConfirmPassword,
	])

	const resetForm = () => {
		setCheckFormValidity(false)
		setName('')
		setEmail('')
		setPassword('')
		setConfirmPassword('')
	}

	return (
		<form className='needs-validation' noValidate onSubmit={onSubmit}>
			<div className='form-floating mb-3'>
				<input
					type='text'
					className='form-control'
					id='name'
					placeholder='Name'
					required
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor='name'>Name</label>
				<div className='invalid-feedback'>
					Please provide a valid name.
				</div>
			</div>
			<div className='form-floating mb-3'>
				<input
					type='email'
					className='form-control'
					id='email'
					placeholder='Email'
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label htmlFor='email'>Email</label>
				<div className='invalid-feedback'>
					Please provide a valid email.
				</div>
			</div>
			<div className='form-floating mb-3'>
				<input
					type='password'
					className='form-control'
					id='password'
					placeholder='Password'
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<label htmlFor='password'>Password</label>
				<div className='invalid-feedback'>
					Password must have at least 8 characters.
				</div>
			</div>
			<div className='form-floating mb-3'>
				<input
					type='password'
					className='form-control'
					id='confirm-password'
					placeholder='Confirm'
					required
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>
				<label htmlFor='confirm-password'>Confirm Password</label>
				<div className='invalid-feedback'>Passwords must match.</div>
			</div>
			{false && ( //! change to login reducer error
				<div className='alert alert-danger' role='alert'>
					An error occured.
				</div>
			)}
			<br />
			<button
				className='btn btn-primary d-block w-100'
				type='submit'
				disabled={false} //! change to login reducer loading
			>
				Sign up
			</button>
		</form>
	)
}

export default RegisterForm
