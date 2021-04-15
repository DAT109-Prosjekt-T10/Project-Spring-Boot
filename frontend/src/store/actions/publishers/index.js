import API from '../../../config/axios'
import {
	POST_PUBLISHER_STARTED,
	POST_PUBLISHER_SUCCESS,
	POST_PUBLISHER_FAILURE,
	GET_PUBLISHER_STARTED,
	GET_PUBLISHER_SUCCESS,
	GET_PUBLISHER_FAILURE,
	GET_PUBLISHERS_STARTED,
	GET_PUBLISHERS_SUCCESS,
	GET_PUBLISHERS_FAILURE,
	UPDATE_PUBLISHER_STARTED,
	UPDATE_PUBLISHER_SUCCESS,
	UPDATE_PUBLISHER_FAILURE,
	DELETE_PUBLISHER_STARTED,
	DELETE_PUBLISHER_SUCCESS,
	DELETE_PUBLISHER_FAILURE,
} from './types'

export const addPublisher = (obj) => {
	return (dispatch) => {
		dispatch(addPublisherStarted())

		API.post('/api/publisher', obj)
			.then((res) => dispatch(addPublisherSuccess(res.data)))
			.catch((err) => {
				dispatch(addPublisherFailure(err.message))
			})
	}
}

const addPublisherStarted = () => ({
	type: POST_PUBLISHER_STARTED,
})

const addPublisherSuccess = (data) => ({
	type: POST_PUBLISHER_SUCCESS,
	payload: {
		data,
	},
})

const addPublisherFailure = (error) => ({
	type: POST_PUBLISHER_FAILURE,
	payload: {
		error,
	},
})

export const getPublisherById = (id) => {
	return async (dispatch) => {
		dispatch(getPublisherByIdStarted())

		API.get(`/api/publisher/${id}`)
			.then((res) => dispatch(getPublisherByIdSuccess(res.data)))
			.catch((err) => {
				dispatch(getPublisherByIdFailure(err.message))
			})
	}
}

const getPublisherByIdStarted = () => ({
	type: GET_PUBLISHER_STARTED,
})

const getPublisherByIdSuccess = (data) => ({
	type: GET_PUBLISHER_SUCCESS,
	payload: {
		data,
	},
})

const getPublisherByIdFailure = (error) => ({
	type: GET_PUBLISHER_FAILURE,
	payload: {
		error,
	},
})

export const getAllPublishers = () => {
	return async (dispatch) => {
		dispatch(getPublishersStarted())

		API.get('/api/publisher')
			.then((res) => dispatch(getPublishersSuccess(res.data)))
			.catch((err) => {
				dispatch(getPublishersFailure(err.message))
			})
	}
}

const getPublishersStarted = () => ({
	type: GET_PUBLISHERS_STARTED,
})

const getPublishersSuccess = (data) => ({
	type: GET_PUBLISHERS_SUCCESS,
	payload: {
		data,
	},
})

const getPublishersFailure = (error) => ({
	type: GET_PUBLISHERS_FAILURE,
	payload: {
		error,
	},
})

export const updatePublisher = (id, obj) => {
	return async (dispatch) => {
		dispatch(updatePublisherStarted())

		API.put(`/api/publisher/${id}`, obj)
			.then((res) => dispatch(updatePublisherSuccess(res.data)))
			.catch((err) => {
				dispatch(updatePublisherFailure(err.message))
			})
	}
}

const updatePublisherStarted = () => ({
	type: UPDATE_PUBLISHER_STARTED,
})

const updatePublisherSuccess = (data) => ({
	type: UPDATE_PUBLISHER_SUCCESS,
	payload: {
		data,
	},
})

const updatePublisherFailure = (error) => ({
	type: UPDATE_PUBLISHER_FAILURE,
	payload: {
		error,
	},
})

export const deletePublisher = (id) => {
	return async (dispatch) => {
		dispatch(deletePublisherStarted())

		API.delete(`/api/publisher/${id}`)
			.then((res) => dispatch(deletePublisherSuccess(res.data)))
			.catch((err) => {
				dispatch(deletePublisherFailure(err.message))
			})
	}
}

const deletePublisherStarted = () => ({
	type: DELETE_PUBLISHER_STARTED,
})

const deletePublisherSuccess = (data) => ({
	type: DELETE_PUBLISHER_SUCCESS,
	payload: {
		data,
	},
})

const deletePublisherFailure = (error) => ({
	type: DELETE_PUBLISHER_FAILURE,
	payload: {
		error,
	},
})
