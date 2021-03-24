import {
	LOGIN_USER_STARTED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	REGISTER_USER_STARTED,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
} from '../../actions/auth/types'

const initialState = {
	data: undefined,
	error: undefined,
	loading: false,
	success: false,
}

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_USER_STARTED:
			return {
				...state,
				error: undefined,
				loading: true,
				success: false,
			}
		case LOGIN_USER_SUCCESS:
			return {
				...state,
				data: action.payload.data,
				loading: false,
				success: true,
			}
		case LOGIN_USER_FAILURE:
			return {
				...state,
				error: action.payload.error,
				loading: false,
				success: false,
			}
		case REGISTER_USER_STARTED:
			return {
				...state,
				error: undefined,
				loading: true,
				success: false,
			}
		case REGISTER_USER_SUCCESS:
			return {
				...state,
				error: undefined,
				loading: false,
				success: true,
			}
		case REGISTER_USER_FAILURE:
			return {
				...state,
				error: action.payload.error,
				loading: false,
				success: false,
			}
		default:
			return state
	}
}

export default authReducer
