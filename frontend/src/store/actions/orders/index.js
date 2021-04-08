import API from '../../../config/axios'
import {
	POST_ORDER_STARTED,
	POST_ORDER_SUCCESS,
	POST_ORDER_FAILURE,
	GET_ORDER_BY_USER_STARTED,
	GET_ORDER_BY_USER_SUCCESS,
	GET_ORDER_BY_USER_FAILURE,
	DELETE_ORDER_STARTED,
	DELETE_ORDER_SUCCESS,
	DELETE_ORDER_FAILURE,
} from './types'

export const addOrder = (obj) => {
	return (dispatch) => {
		dispatch(addOrderStarted())

		API.post('/api/order', obj)
			.then((res) => dispatch(addOrderSuccess(res.data)))
			.catch((err) => {
				dispatch(addOrderFailure(err.message))
			})
	}
}

const addOrderStarted = () => ({
	type: POST_ORDER_STARTED,
})

const addOrderSuccess = (data) => ({
	type: POST_ORDER_SUCCESS,
	payload: {
		data,
	},
})

const addOrderFailure = (error) => ({
	type: POST_ORDER_FAILURE,
	payload: {
		error,
	},
})

export const getOrderByUserId = (id) => {
	return async (dispatch) => {
		dispatch(getOrderByUserIdStarted())

		API.get(`/api/books/${id}`)
			.then((res) => dispatch(getOrderByUserIdSuccess(res.data)))
			.catch((err) => {
				dispatch(getOrderByUserIdFailure(err.message))
			})
	}
}

const getOrderByUserIdStarted = () => ({
	type: GET_ORDER_BY_USER_STARTED,
})

const getOrderByUserIdSuccess = (data) => ({
	type: GET_ORDER_BY_USER_SUCCESS,
	payload: {
		data,
	},
})

const getOrderByUserIdFailure = (error) => ({
	type: GET_ORDER_BY_USER_FAILURE,
	payload: {
		error,
	},
})

export const deleteOrder = (id) => {
	return async (dispatch) => {
		dispatch(deleteOrderStarted())

		API.delete(`/api/order/${id}`)
			.then((res) => dispatch(deleteOrderSuccess(res.data)))
			.catch((err) => {
				dispatch(deleteOrderFailure(err.message))
			})
	}
}

const deleteOrderStarted = () => ({
	type: DELETE_ORDER_STARTED,
})

const deleteOrderSuccess = (data) => ({
	type: DELETE_ORDER_SUCCESS,
	payload: {
		data,
	},
})

const deleteOrderFailure = (error) => ({
	type: DELETE_ORDER_FAILURE,
	payload: {
		error,
	},
})
