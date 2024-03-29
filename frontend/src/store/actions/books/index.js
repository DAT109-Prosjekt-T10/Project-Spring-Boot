import API from '../../../config/axios'
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
} from './types'

export const addBook = (obj) => {
	return (dispatch) => {
		dispatch(addBookStarted())

		API.post('/api/books', obj)
			.then((res) => dispatch(addBookSuccess(res.data)))
			.catch((err) => {
				const error = err.response.data
				error && error.errorMessage
					? dispatch(addBookFailure(error.errorMessage))
					: dispatch(addBookFailure(err))
			})
	}
}

const addBookStarted = () => ({
	type: POST_BOOK_STARTED,
})

const addBookSuccess = (data) => ({
	type: POST_BOOK_SUCCESS,
	payload: {
		data,
	},
})

const addBookFailure = (error) => ({
	type: POST_BOOK_FAILURE,
	payload: {
		error,
	},
})

export const getBookById = (id) => {
	return async (dispatch) => {
		dispatch(getBookByIdStarted())

		API.get(`/api/books/${id}`)
			.then((res) => dispatch(getBookByIdSuccess(res.data)))
			.catch((err) => {
				const error = err.response.data
				error && error.errorMessage
					? dispatch(getBookByIdFailure(error.errorMessage))
					: dispatch(getBookByIdFailure(err))
			})
	}
}

const getBookByIdStarted = () => ({
	type: GET_BOOK_STARTED,
})

const getBookByIdSuccess = (data) => ({
	type: GET_BOOK_SUCCESS,
	payload: {
		data,
	},
})

const getBookByIdFailure = (error) => ({
	type: GET_BOOK_FAILURE,
	payload: {
		error,
	},
})

export const getAllBooks = () => {
	return async (dispatch) => {
		dispatch(getAllBooksStarted())

		API.get('/api/books')
			.then((res) => dispatch(getAllBooksSuccess(res.data)))
			.catch((err) => {
				const error = err.response.data
				error && error.errorMessage
					? dispatch(getAllBooksFailure(error.errorMessage))
					: dispatch(getAllBooksFailure(err))
			})
	}
}

const getAllBooksStarted = () => ({
	type: GET_BOOKS_STARTED,
})

const getAllBooksSuccess = (data) => ({
	type: GET_BOOKS_SUCCESS,
	payload: {
		data,
	},
})

const getAllBooksFailure = (error) => ({
	type: GET_BOOKS_FAILURE,
	payload: {
		error,
	},
})

export const updateBook = (id, obj) => {
	return async (dispatch) => {
		dispatch(updateBookStarted())

		API.put(`/api/books/${id}`, obj)
			.then((res) => dispatch(updateBookSuccess(res.data)))
			.catch((err) => {
				if (err.response.data) {
					const error = err.response.data
					error && error.errorMessage
						? dispatch(updateBookFailure(error.errorMessage))
						: dispatch(updateBookFailure(err))
				}
			})
	}
}

const updateBookStarted = () => ({
	type: UPDATE_BOOK_STARTED,
})

const updateBookSuccess = (data) => ({
	type: UPDATE_BOOK_SUCCESS,
	payload: {
		data,
	},
})

const updateBookFailure = (error) => ({
	type: UPDATE_BOOK_FAILURE,
	payload: {
		error,
	},
})

export const deleteBook = (id) => {
	return async (dispatch) => {
		dispatch(deleteBookStarted())

		API.delete(`/api/books/${id}`)
			.then((res) => dispatch(deleteBookSuccess(res.data)))
			.catch((err) => {
				const error = err.response.data
				error && error.errorMessage
					? dispatch(deleteBookFailure(error.errorMessage))
					: dispatch(deleteBookFailure(err))
			})
	}
}

const deleteBookStarted = () => ({
	type: DELETE_BOOK_STARTED,
})

const deleteBookSuccess = (data) => ({
	type: DELETE_BOOK_SUCCESS,
	payload: {
		data,
	},
})

const deleteBookFailure = (error) => ({
	type: DELETE_BOOK_FAILURE,
	payload: {
		error,
	},
})
