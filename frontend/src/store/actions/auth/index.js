import API from '../../../config/axios'
import {
	LOGIN_USER_STARTED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	REGISTER_USER_STARTED,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	LOGOUT_USER,
	GET_ALL_USERS_STARTED,
	GET_ALL_USERS_SUCCESS,
	GET_ALL_USERS_FAILURE,
} from './types'

export const loginUser = (obj) => {
	return (dispatch) => {
		dispatch(loginUserStarted())

		API.post('/api/user/login', obj)
			.then((res) => dispatch(loginUserSuccess(res.data)))
			.catch((err) => {
				const error = err.response.data
				error && error.errorMessage
					? dispatch(loginUserFailure(error.errorMessage))
					: dispatch(loginUserFailure(err))
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

		API.post('/api/user/register', obj)
			.then((res) => dispatch(registerUserSuccess(res.data)))
			.catch((err) => {
				const error = err.response.data
				error && error.errorMessage
					? dispatch(registerUserFailure(error.errorMessage))
					: dispatch(registerUserFailure(err))
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

export const logoutUser = () => ({
	type: LOGOUT_USER,
	payload: {},
})

export const getAllUsers = () => {
	return (dispatch) => {
		dispatch(getAllUsersStarted())

		API.get('/api/user')
			.then((res) => dispatch(getAllUsersSuccess(res.data)))
			.catch((err) => {
				dispatch(getAllUsersFailure(err.message))
			})
	}
}

export const getAllUsersStarted = () => ({
	type: GET_ALL_USERS_STARTED,
})

export const getAllUsersSuccess = (data) => ({
	type: GET_ALL_USERS_SUCCESS,
	payload: {
		data,
	},
})

export const getAllUsersFailure = (error) => ({
	type: GET_ALL_USERS_FAILURE,
	payload: {
		error,
	},
})
