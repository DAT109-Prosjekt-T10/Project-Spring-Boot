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
} from '../../actions/auth/types'

const initialState = {
	data: undefined,
	allUsers: [],
	error: undefined,
	loading: false,
	login: {
		error: undefined,
		loading: false,
	},
	register: {
		error: undefined,
		loading: false,
	},
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_USER_STARTED:
			return {
				...state,
				login: {
					error: undefined,
					loading: true,
				},
			}
		case LOGIN_USER_SUCCESS:
			localStorage.setItem('user', action.payload.data)
			return {
				...state,
				data: action.payload.data,
				login: {
					error: undefined,
					loading: false,
				},
			}
		case LOGIN_USER_FAILURE:
			return {
				...state,
				login: {
					error: action.payload.error,
					loading: false,
				},
			}
		case REGISTER_USER_STARTED:
			return {
				...state,
				register: {
					error: undefined,
					loading: true,
				},
			}
		case REGISTER_USER_SUCCESS:
			localStorage.setItem('user', action.payload.data)
			return {
				...state,
				data: action.payload.data,
				register: {
					error: undefined,
					loading: false,
				},
			}
		case REGISTER_USER_FAILURE:
			return {
				...state,
				register: {
					error: action.payload.error,
					loading: false,
				},
			}
		case LOGOUT_USER:
			localStorage.removeItem('user')
			return {
				...initialState,
			}

		case GET_ALL_USERS_STARTED:
			return {
				...state,
				error: undefined,
				loading: true,
			}

		case GET_ALL_USERS_SUCCESS:
			return {
				...state,
				allUsers: action.payload.data,
				loading: false,
			}
		case GET_ALL_USERS_FAILURE:
			return {
				...state,
				error: action.payload.error,
				loading: false,
			}

		default:
			return state
	}
}

export default userReducer
