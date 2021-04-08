import API from '../../../config/axios'
import {
	CURRENT_USER_STARTED,
	CURRENT_USER_SUCCESS,
	CURRENT_USER_FAILURE,
	LOGOUT_USER,
} from './types'

export const loginUser = (obj) => {
	return (dispatch) => {
		dispatch(loginUserStarted())

		API.post('/api/user/login', obj)
			.then((res) => dispatch(loginUserSuccess(res.data)))
			.catch((err) => {
				dispatch(loginUserFailure(err.message))
			})
	}
}

const loginUserStarted = () => ({
	type: CURRENT_USER_STARTED,
})

const loginUserSuccess = (data) => ({
	type: CURRENT_USER_SUCCESS,
	payload: {
		data,
	},
})

const loginUserFailure = (error) => ({
	type: CURRENT_USER_FAILURE,
	payload: {
		error,
	},
})

export const registerUser = (obj) => {
	return (dispatch) => {
		dispatch(registerUserStarted())

		API.post('/api/user/register', obj)
			.then((res) => dispatch(registerUserSuccess(res.data)))
			.catch((err) => {
				dispatch(registerUserFailure(err.message))
			})
	}
}

const registerUserStarted = () => ({
	type: CURRENT_USER_STARTED,
})

const registerUserSuccess = (data) => ({
	type: CURRENT_USER_SUCCESS,
	payload: {
		data,
	},
})

const registerUserFailure = (error) => ({
	type: CURRENT_USER_FAILURE,
	payload: {
		error,
	},
})

export const logoutUser = () => ({
	type: LOGOUT_USER,
	payload: {},
})
