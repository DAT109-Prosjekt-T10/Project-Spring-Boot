import {
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
				loading: false,
				success: true,
			}
		case REGISTER_USER_FAILURE:
			return {
				...state,
				error: action.payload.error,
				loading: false,
			}
		default:
			return state
	}
}

export default authReducer
