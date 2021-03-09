import React, { useState, useEffect } from 'react'
import _ from 'lodash'

const RegisterForm = () => {
	//* form utilities
	const [hidePassword, setHidePassword] = useState(true)
	const [hideConfirmPassword, setHideConfirmPassword] = useState(true)

	const onSubmit = (e) => {
		e.preventDefault()

		//? log in user

		//? redirect user to dashboard
	}

	//* bootstrap client side form validation
	useEffect(() => {
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		let forms = document.querySelectorAll('.needs-validation')

		// Loop over them and prevent submission
		Array.prototype.slice.call(forms).forEach(function (form) {
			form.addEventListener(
				'submit',
				function (event) {
					if (!form.checkValidity()) {
						event.preventDefault()
						event.stopPropagation()
					}

					form.classList.add('was-validated')
				},
				false
			)
		})
	}, [])

	return (
		<form className='needs-validation' noValidate onSubmit={onSubmit}>
			<div className='input-group mb-3'>
				<i className='ai-user position-absolute top-50 start-0 translate-middle-y ms-3'></i>
				<input
					className='form-control rounded'
					type='text'
					placeholder='Name'
					required
				/>
				<div className='invalid-feedback'>
					Please provide a valid name.
				</div>
			</div>
			<div className='input-group mb-3'>
				<i className='ai-mail position-absolute top-50 start-0 translate-middle-y ms-3'></i>
				<input
					className='form-control rounded'
					type='email'
					placeholder='Email'
					required
				/>
				<div className='invalid-feedback'>
					Please provide a valid email.
				</div>
			</div>
			<div className='input-group mb-3'>
				<i className='ai-lock position-absolute top-50 start-0 translate-middle-y ms-3'></i>
				<div className='password-toggle w-100'>
					<input
						className='form-control'
						type={hidePassword ? 'password' : 'text'}
						placeholder='Password'
						required
						minLength='8'
					/>
					<div className='invalid-feedback'>
						Password must have at least 8 characters.
					</div>
					{/* <label
						className='password-toggle-btn'
						aria-label='Show/hide password'
					>
						<input
							className='password-toggle-check'
							type='checkbox'
							onClick={() => setHidePassword(!hidePassword)}
						/>
						<span className='password-toggle-indicator'></span>
					</label> */}
				</div>
			</div>
			<div className='input-group mb-4'>
				<i className='ai-lock position-absolute top-50 start-0 translate-middle-y ms-3'></i>
				<div className='password-toggle w-100'>
					<input
						className='form-control'
						type={hideConfirmPassword ? 'password' : 'text'}
						placeholder='Confirm Password'
						required
					/>
					<div className='invalid-feedback'>
						The passwords do not match.
					</div>
					{/* <label
						className='password-toggle-btn'
						aria-label='Show/hide password'
					>
						<input
							className='password-toggle-check'
							type='checkbox'
							onClick={() =>
								setHideConfirmPassword(!hideConfirmPassword)
							}
						/>
						<span className='password-toggle-indicator'></span>
					</label> */}
				</div>
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
