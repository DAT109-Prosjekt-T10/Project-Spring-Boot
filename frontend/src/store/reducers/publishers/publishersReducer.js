import {
	POST_PUBLISHER_STARTED,
	POST_PUBLISHER_SUCCESS,
	POST_PUBLISHER_FAILURE,
	GET_PUBLISHERS_STARTED,
	GET_PUBLISHERS_SUCCESS,
	GET_PUBLISHERS_FAILURE,
	UPDATE_PUBLISHER_STARTED,
	UPDATE_PUBLISHER_SUCCESS,
	UPDATE_PUBLISHER_FAILURE,
	DELETE_PUBLISHER_STARTED,
	DELETE_PUBLISHER_SUCCESS,
	DELETE_PUBLISHER_FAILURE,
} from '../../actions/publishers/types'

const initialState = {
	//* set default state
	data: [],
	error: undefined,
	loading: false,
	success: false,
	update: {
		loading: false,
		success: false,
		error: undefined,
	},
	delete: {
		loading: false,
		success: false,
		error: undefined,
	},
	post: {
		loading: false,
		success: false,
		error: undefined,
	},
}

const publishersReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_PUBLISHERS_STARTED:
			return {
				...state,
				loading: true,
				success: false,
			}
		case GET_PUBLISHERS_SUCCESS:
			return {
				...state,
				data: action.payload.data,
				loading: false,
				success: true,
			}
		case GET_PUBLISHERS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			}
		case UPDATE_PUBLISHER_STARTED:
			return {
				...state,
				update: {
					...state.update,
					loading: true,
					success: false,
					error: null,
				},
			}
		case UPDATE_PUBLISHER_SUCCESS:
			return {
				...state,
				data: [
					...state.data.map((publisher) =>
						publisher.id === action.payload.data.id
							? action.payload.data
							: publisher
					),
				],
				update: {
					...state.update,
					loading: false,
					success: true,
				},
			}
		case UPDATE_PUBLISHER_FAILURE:
			return {
				...state,
				update: {
					...state.update,
					loading: false,
					error: action.payload.error,
				},
			}
		case DELETE_PUBLISHER_STARTED:
			return {
				...state,
				delete: {
					...state.delete,
					loading: true,
					success: false,
					error: null,
				},
			}
		case DELETE_PUBLISHER_SUCCESS:
			//* filters out deleted element from state
			return {
				...state,
				data: [
					...state.data.filter(
						(author) => author.id !== action.payload.data
					),
				],
				delete: {
					...state.delete,
					loading: false,
					success: true,
				},
			}
		case DELETE_PUBLISHER_FAILURE:
			return {
				...state,
				delete: {
					...state.delete,
					loading: false,
					error: action.payload.error,
				},
			}
		case POST_PUBLISHER_STARTED:
			return {
				...state,
				post: {
					...state.post,
					loading: true,
					success: false,
					error: null,
				},
			}
		case POST_PUBLISHER_SUCCESS:
			return {
				...state,
				data: [...state.data, action.payload.data],
				post: {
					...state.post,
					loading: false,
					success: true,
				},
			}
		case POST_PUBLISHER_FAILURE:
			return {
				...state,
				post: {
					...state.post,
					loading: false,
					error: action.payload.error,
				},
			}

		default:
			return state
	}
}

export default publishersReducer
