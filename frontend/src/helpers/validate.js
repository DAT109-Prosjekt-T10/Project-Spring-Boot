import validator from 'email-validator'

export const checkRegisterFormValidity = (
	document,
	name,
	email,
	password,
	confirmPassword
) => {
	if (name.length < 1) {
		document.querySelector('#name').classList.add('is-invalid')
		document.querySelector('#name').classList.remove('is-valid')
	} else {
		document.querySelector('#name').classList.remove('is-invalid')
		document.querySelector('#name').classList.add('is-valid')
	}
	if (email.length > 3 && validator.validate(email)) {
		document.querySelector('#email').classList.remove('is-invalid')
		document.querySelector('#email').classList.add('is-valid')
	} else {
		document.querySelector('#email').classList.add('is-invalid')
		document.querySelector('#email').classList.remove('is-valid')
	}
	if (password.length > 7) {
		document.querySelector('#password').classList.remove('is-invalid')
		document.querySelector('#password').classList.add('is-valid')
	} else {
		document.querySelector('#password').classList.add('is-invalid')
		document.querySelector('#password').classList.remove('is-valid')
	}
	if (confirmPassword.length > 7 && confirmPassword === password) {
		document
			.querySelector('#confirm-password')
			.classList.remove('is-invalid')
		document.querySelector('#confirm-password').classList.add('is-valid')
	} else {
		document.querySelector('#confirm-password').classList.add('is-invalid')
		document.querySelector('#confirm-password').classList.remove('is-valid')
	}
}
