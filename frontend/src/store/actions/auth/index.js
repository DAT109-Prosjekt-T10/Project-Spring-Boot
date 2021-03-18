import axios from '../../../config/axios'
import {
	LOGIN_USER_STARTED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	REGISTER_USER_STARTED,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
} from './types'

export const loginUser = (obj) => {
	return (dispatch) => {
		dispatch(loginUserStarted())

		axios
			.post('/api/user/login', obj)
			.then((res) => dispatch(loginUserSuccess(res.data)))
			.catch((err) => {
				dispatch(loginUserFailure(err.message))
			})
	}
}

const loginUserStarted = () => ({
	type: LOGIN_USER_STARTED,
})

const loginUserSuccess = (data) => ({
	type: LOGIN_USER_SUCCESS,
	payload: {
		data,
	},
})

const loginUserFailure = (error) => ({
	type: LOGIN_USER_FAILURE,
	payload: {
		error,
	},
})

export const registerUser = (obj) => {
	return (dispatch) => {
		dispatch(registerUserStarted())

		axios
			.post('/api/user/register', obj)
			.then((res) => dispatch(registerUserSuccess(res.data)))
			.catch((err) => {
				dispatch(registerUserFailure(err.message))
			})
	}
}

const registerUserStarted = () => ({
	type: REGISTER_USER_STARTED,
})

const registerUserSuccess = (data) => ({
	type: REGISTER_USER_SUCCESS,
	payload: {
		data,
	},
})

const registerUserFailure = (error) => ({
	type: REGISTER_USER_FAILURE,
	payload: {
		error,
	},
})
