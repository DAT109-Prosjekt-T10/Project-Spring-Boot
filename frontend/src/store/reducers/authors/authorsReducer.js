import {
	POST_AUTHOR_STARTED,
	POST_AUTHOR_SUCCESS,
	POST_AUTHOR_FAILURE,
	GET_AUTHOR_STARTED,
	GET_AUTHOR_SUCCESS,
	GET_AUTHOR_FAILURE,
	GET_AUTHORS_STARTED,
	GET_AUTHORS_SUCCESS,
	GET_AUTHORS_FAILURE,
	UPDATE_AUTHOR_STARTED,
	UPDATE_AUTHOR_SUCCESS,
	UPDATE_AUTHOR_FAILURE,
	DELETE_AUTHOR_STARTED,
	DELETE_AUTHOR_SUCCESS,
	DELETE_AUTHOR_FAILURE,
} from '../../actions/authors/types'

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

const authorReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_AUTHORS_STARTED:
			return {
				...state,
				loading: true,
				success: false,
			}
		case GET_AUTHORS_SUCCESS:
			return {
				...state,
				data: action.payload.data,
				loading: false,
				success: true,
			}
		case GET_AUTHORS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			}
		case UPDATE_AUTHOR_STARTED:
			return {
				...state,
				update: {
					...state.update,
					loading: true,
					success: false,
					error: null,
				},
			}
		case UPDATE_AUTHOR_SUCCESS:
			return {
				...state,
				data: [
					...state.data.map((author) =>
						author.id === action.payload.data.id
							? action.payload.data
							: author
					),
				],
				update: {
					...state.update,
					loading: false,
					success: true,
				},
			}
		case UPDATE_AUTHOR_FAILURE:
			return {
				...state,
				update: {
					...state.update,
					loading: false,
					error: action.payload.error,
				},
			}
		case DELETE_AUTHOR_STARTED:
			return {
				...state,
				delete: {
					...state.delete,
					loading: true,
					success: false,
					error: null,
				},
			}
		case DELETE_AUTHOR_SUCCESS:
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
		case DELETE_AUTHOR_FAILURE:
			return {
				...state,
				delete: {
					...state.delete,
					loading: false,
					error: action.payload.error,
				},
			}
		case POST_AUTHOR_STARTED:
			return {
				...state,
				post: {
					...state.post,
					loading: true,
					success: false,
					error: null,
				},
			}
		case POST_AUTHOR_SUCCESS:
			return {
				...state,
				data: [...state.data, action.payload.data],
				post: {
					...state.post,
					loading: false,
					success: true,
				},
			}
		case POST_AUTHOR_FAILURE:
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

export default authorReducer
