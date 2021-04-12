import API from '../../../config/axios'
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
} from './types'

export const addAuthor = (obj) => {
	return (dispatch) => {
		dispatch(addAuthorStarted())

		API.post('/api/author', obj)
			.then((res) => dispatch(addAuthorSuccess(res.data)))
			.catch((err) => {
				const error = err.response.data
				error && error.errorMessage
					? dispatch(addAuthorFailure(error.errorMessage))
					: dispatch(addAuthorFailure(err))
			})
	}
}

const addAuthorStarted = () => ({
	type: POST_AUTHOR_STARTED,
})

const addAuthorSuccess = (data) => ({
	type: POST_AUTHOR_SUCCESS,
	payload: {
		data,
	},
})

const addAuthorFailure = (error) => ({
	type: POST_AUTHOR_FAILURE,
	payload: {
		error,
	},
})

export const getAuthorById = (id) => {
	return async (dispatch) => {
		dispatch(getAuthorByIdStarted())

		API.get(`/api/author/${id}`)
			.then((res) => dispatch(getAuthorByIdSuccess(res.data)))
			.catch((err) => {
				const error = err.response.data
				error && error.errorMessage
					? dispatch(getAuthorByIdFailure(error.errorMessage))
					: dispatch(getAuthorByIdFailure(err))
			})
	}
}

const getAuthorByIdStarted = () => ({
	type: GET_AUTHOR_STARTED,
})

const getAuthorByIdSuccess = (data) => ({
	type: GET_AUTHOR_SUCCESS,
	payload: {
		data,
	},
})

const getAuthorByIdFailure = (error) => ({
	type: GET_AUTHOR_FAILURE,
	payload: {
		error,
	},
})

export const getAllAuthors = () => {
	return async (dispatch) => {
		dispatch(getAuthorsStarted())

		API.get('/api/author')
			.then((res) => dispatch(getAuthorsSuccess(res.data)))
			.catch((err) => {
				const error = err.response.data
				error && error.errorMessage
					? dispatch(getAuthorsFailure(error.errorMessage))
					: dispatch(getAuthorsFailure(err))
			})
	}
}

const getAuthorsStarted = () => ({
	type: GET_AUTHORS_STARTED,
})

const getAuthorsSuccess = (data) => ({
	type: GET_AUTHORS_SUCCESS,
	payload: {
		data,
	},
})

const getAuthorsFailure = (error) => ({
	type: GET_AUTHORS_FAILURE,
	payload: {
		error,
	},
})

export const updateAuthor = (id, obj) => {
	return async (dispatch) => {
		dispatch(updateAuthorStarted())

		API.put(`/api/author/${id}`, obj)
			.then((res) => dispatch(updateAuthorSuccess(res.data)))
			.catch((err) => {
				const error = err.response.data
				error && error.errorMessage
					? dispatch(updateAuthorFailure(error.errorMessage))
					: dispatch(updateAuthorFailure(err))
			})
	}
}

const updateAuthorStarted = () => ({
	type: UPDATE_AUTHOR_STARTED,
})

const updateAuthorSuccess = (data) => ({
	type: UPDATE_AUTHOR_SUCCESS,
	payload: {
		data,
	},
})

const updateAuthorFailure = (error) => ({
	type: UPDATE_AUTHOR_FAILURE,
	payload: {
		error,
	},
})

export const deleteAuthor = (id) => {
	return async (dispatch) => {
		dispatch(deleteAuthorStarted())

		API.delete(`/api/author/${id}`)
			.then((res) => dispatch(deleteAuthorSuccess(res.data)))
			.catch((err) => {
				const error = err.response.data
				error && error.errorMessage
					? dispatch(deleteAuthorFailure(error.errorMessage))
					: dispatch(deleteAuthorFailure(err))
			})
	}
}

const deleteAuthorStarted = () => ({
	type: DELETE_AUTHOR_STARTED,
})

const deleteAuthorSuccess = (data) => ({
	type: DELETE_AUTHOR_SUCCESS,
	payload: {
		data,
	},
})

const deleteAuthorFailure = (error) => ({
	type: DELETE_AUTHOR_FAILURE,
	payload: {
		error,
	},
})
