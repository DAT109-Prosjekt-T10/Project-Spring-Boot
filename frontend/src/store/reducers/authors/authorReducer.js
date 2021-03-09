import {
	GET_RECEIVER_STARTED,
	GET_RECEIVER_SUCCESS,
	GET_RECEIVER_FAILURE,
	UPDATE_RECEIVER_PROFILE_STARTED,
	UPDATE_RECEIVER_PROFILE_SUCCESS,
	UPDATE_RECEIVER_PROFILE_FAILURE,
} from '../actions/'

const initialState = {
	//* set default state
}

const authorReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_RECEIVER_STARTED:
			return {
				...state,
				loading: true,
			}
		case GET_RECEIVER_SUCCESS:
			return {
				...state,
				data: action.payload.data,
				loading: false,
			}
		case GET_RECEIVER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			}
		case UPDATE_RECEIVER_PROFILE_STARTED:
			return {
				...state,
				update: {
					loading: true,
					success: false,
					error: null,
				},
			}
		case UPDATE_RECEIVER_PROFILE_SUCCESS:
			return {
				...state,
				data: action.payload.data,
				update: {
					loading: false,
					success: true,
					error: null,
				},
			}
		case UPDATE_RECEIVER_PROFILE_FAILURE:
			return {
				...state,
				update: {
					loading: false,
					success: false,
					error: action.payload.error,
				},
			}
		default:
			return state
	}
}

export default authorReducer
