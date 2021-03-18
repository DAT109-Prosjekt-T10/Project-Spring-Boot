import validator from 'email-validator'

export const isRegisterFormValid = (name, email, password, confirmPassword) => {
	return (
		isNameValid(name) &&
		isEmailValid(email) &&
		isPasswordValid(password) &&
		isConfirmPasswordValid(password, confirmPassword)
	)
}

export const checkRegisterFormValidity = (
	document,
	name,
	email,
	password,
	confirmPassword
) => {
	if (isNameValid(name)) {
		document.querySelector('#name').classList.remove('is-invalid')
		document.querySelector('#name').classList.add('is-valid')
	} else {
		document.querySelector('#name').classList.add('is-invalid')
		document.querySelector('#name').classList.remove('is-valid')
	}
	if (isEmailValid(email)) {
		document.querySelector('#email').classList.remove('is-invalid')
		document.querySelector('#email').classList.add('is-valid')
	} else {
		document.querySelector('#email').classList.add('is-invalid')
		document.querySelector('#email').classList.remove('is-valid')
	}
	if (isPasswordValid(password)) {
		document.querySelector('#password').classList.remove('is-invalid')
		document.querySelector('#password').classList.add('is-valid')
	} else {
		document.querySelector('#password').classList.add('is-invalid')
		document.querySelector('#password').classList.remove('is-valid')
	}
	if (isConfirmPasswordValid(password, confirmPassword)) {
		document
			.querySelector('#confirm-password')
			.classList.remove('is-invalid')
		document.querySelector('#confirm-password').classList.add('is-valid')
	} else {
		document.querySelector('#confirm-password').classList.add('is-invalid')
		document.querySelector('#confirm-password').classList.remove('is-valid')
	}
}

const isNameValid = (name) => {
	return name.length > 1
}

const isEmailValid = (email) => {
	return validator.validate(email)
}

const isPasswordValid = (password) => {
	return password.length > 7
}

const isConfirmPasswordValid = (password, confirmPassword) => {
	return confirmPassword.length > 7 && confirmPassword === password
}
