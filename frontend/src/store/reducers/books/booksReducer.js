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
	data: undefined,
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
					loading: true,
					success: false,
					error: null,
				},
			}
		case UPDATE_BOOK_SUCCESS:
			//* find the index of element that is being updated in state
			const index = state.data.findIndex(
				(book) => book.id === action.payload.data.id
			)

			//* add updated element in state
			state.data[index] = action.payload.data
			return {
				...state,
				data: [...state.data],
				update: {
					loading: false,
					success: true,
				},
			}
		case UPDATE_BOOK_FAILURE:
			return {
				...state,
				update: {
					loading: false,
					error: action.payload.error,
				},
			}
		case DELETE_BOOK_STARTED:
			return {
				...state,
				delete: {
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
					loading: false,
					success: true,
				},
			}
		case DELETE_BOOK_FAILURE:
			return {
				...state,
				delete: {
					loading: false,
					error: action.payload.error,
				},
			}
		case POST_BOOK_STARTED:
			return {
				...state,
				post: {
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
					loading: false,
					success: true,
				},
			}
		case POST_BOOK_FAILURE:
			return {
				...state,
				post: {
					loading: false,
					error: action.payload.error,
				},
			}

		default:
			return state
	}
}

export default booksReducer
