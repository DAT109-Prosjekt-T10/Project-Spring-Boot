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
		default:
			return state
	}
}

export default authorReducer
