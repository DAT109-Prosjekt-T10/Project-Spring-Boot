import {
	POST_BOOK_STARTED,
	POST_BOOK_SUCCESS,
	POST_BOOK_FAILURE,
	GET_BOOK_STARTED,
	GET_BOOK_SUCCESS,
	GET_BOOK_FAILURE,
	GET_BOOKS_STARTED,
	GET_BOOKS_SUCCESS,
	GET_BOOKS_FAILURE,
	UPDATE_BOOK_STARTED,
	UPDATE_BOOK_SUCCESS,
	UPDATE_BOOK_FAILURE,
	DELETE_BOOK_STARTED,
	DELETE_BOOK_SUCCESS,
	DELETE_BOOK_FAILURE,
} from '../../actions/books/types'

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

const booksReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_BOOKS_STARTED:
			return {
				...state,
				loading: true,
				success: false,
				update: initialState.update,
				delete: initialState.delete,
				post: initialState.post,
			}
		case GET_BOOKS_SUCCESS:
			return {
				...state,
				data: action.payload.data,
				loading: false,
				success: true,
			}
		case GET_BOOKS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			}
		case UPDATE_BOOK_STARTED:
			return {
				...state,
				update: {
					...state.update,
					loading: true,
					success: false,
					error: null,
				},
			}
		case UPDATE_BOOK_SUCCESS:
			return {
				...state,
				data: [
					...state.data.map((book) =>
						book.id === action.payload.data.id
							? action.payload.data
							: book
					),
				],
				update: {
					...state.update,
					loading: false,
					success: true,
				},
			}
		case UPDATE_BOOK_FAILURE:
			return {
				...state,
				update: {
					...state.update,
					loading: false,
					error: action.payload.error,
				},
			}
		case DELETE_BOOK_STARTED:
			return {
				...state,
				delete: {
					...state.delete,
					loading: true,
					success: false,
					error: null,
				},
			}
		case DELETE_BOOK_SUCCESS:
			//* filters out deleted element from state
			return {
				...state,
				data: [
					...state.data.filter(
						(book) => book.id !== action.payload.data
					),
				],
				delete: {
					...state.delete,
					loading: false,
					success: true,
				},
			}
		case DELETE_BOOK_FAILURE:
			return {
				...state,
				delete: {
					...state.delete,
					loading: false,
					error: action.payload.error,
				},
			}
		case POST_BOOK_STARTED:
			return {
				...state,
				post: {
					...state.post,
					loading: true,
					success: false,
					error: null,
				},
			}
		case POST_BOOK_SUCCESS:
			return {
				...state,
				data: [...state.data, action.payload.data],
				post: {
					...state.post,
					loading: false,
					success: true,
				},
			}
		case POST_BOOK_FAILURE:
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

export default booksReducer
