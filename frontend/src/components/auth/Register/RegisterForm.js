import React, { useState, useEffect } from 'react'
import {
	isRegisterFormValid,
	checkRegisterFormValidity,
} from '../../../helpers/validate'

const HARDCODED_ADMIN_CODE = '0150'

const RegisterForm = ({ handleRegister }) => {
	//* form utils
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	//* hardcoded admin code to set user as an admin
	const [adminCode, setAdminCode] = useState('')

	const [checkFormValidity, setCheckFormValidity] = useState(false)

	//* submit handler
	const onSubmit = (e) => {
		e.preventDefault()

		//* checks if form is valid
		if (isRegisterFormValid(name, email, password, confirmPassword)) {
			let user = {
				name,
				email,
				password,
				admin: adminCode === HARDCODED_ADMIN_CODE,
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
			<div className='form-floating mb-3'>
				<input
					type='password'
					className='form-control'
					id='admin-code'
					placeholder='Admin'
					value={adminCode}
					onChange={(e) => setAdminCode(e.target.value)}
				/>
				<label htmlFor='admin-code'>Admin Code (code is 0150)</label>
			</div>
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
