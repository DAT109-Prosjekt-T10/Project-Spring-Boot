import axios from '../../../config/axios'
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

		axios
			.post('/api/books', obj)
			.then((res) => dispatch(addBookSuccess(res.data)))
			.catch((err) => {
				dispatch(addBookFailure(err.message))
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

		axios
			.get(`/api/books/${id}`)
			.then((res) => dispatch(getBookByIdSuccess(res.data)))
			.catch((err) => {
				dispatch(getBookByIdFailure(err.message))
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

		axios
			.get('/api/books')
			.then((res) => dispatch(getAllBooksSuccess(res.data)))
			.catch((err) => {
				dispatch(getAllBooksFailure(err.message))
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

		axios
			.put(`/api/books/${id}`, obj)
			.then((res) => dispatch(updateBookSuccess(res.data)))
			.catch((err) => {
				dispatch(updateBookFailure(err.message))
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

		axios
			.delete(`/api/books/${id}`)
			.then((res) => dispatch(deleteBookSuccess(res.data)))
			.catch((err) => {
				dispatch(deleteBookFailure(err.message))
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
