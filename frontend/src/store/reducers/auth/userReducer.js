import {
	CURRENT_USER_STARTED,
	CURRENT_USER_SUCCESS,
	CURRENT_USER_FAILURE,
	LOGOUT_USER,
	GET_ALL_USERS_STARTED,
	GET_ALL_USERS_SUCCESS,
	GET_ALL_USERS_FAILURE,
} from '../../actions/auth/types'

const initialState = {
	data: undefined,
	allusers: [],
	error: undefined,
	loading: false,
}

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case CURRENT_USER_STARTED:
			return {
				...state,
				error: undefined,
				loading: true,
			}
		case CURRENT_USER_SUCCESS:
			localStorage.setItem('user', action.payload.data)
			return {
				...state,
				data: action.payload.data,
				loading: false,
			}
		case CURRENT_USER_FAILURE:
			return {
				...state,
				error: action.payload.error,
				loading: false,
			}
		case LOGOUT_USER:
			localStorage.removeItem('user')
			return {
				state: initialState,
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
				allusers: action.payload.data,
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
