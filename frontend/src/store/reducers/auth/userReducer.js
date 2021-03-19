import {
	CURRENT_USER_STARTED,
	CURRENT_USER_SUCCESS,
	CURRENT_USER_FAILURE,
	LOGOUT_USER,
} from '../../actions/auth/types'

const initialState = {
	data: undefined,
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
			return {
				state: initialState,
			}
		default:
			return state
	}
}

export default userReducer
