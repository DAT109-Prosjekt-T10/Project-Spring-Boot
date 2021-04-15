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
	GET_ALL_ORDERS_STARTED,
	GET_ALL_ORDERS_SUCCESS,
	GET_ALL_ORDERS_FAILURE,
} from '../../actions/orders/types'

const initialState = {
	//* set default state
	data: [],
	allOrders: [],
	error: undefined,
	loading: false,
	success: false,
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
	get: {
		loading: false,
		success: false,
		error: undefined,
	},
}

const ordersReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ORDER_BY_USER_STARTED:
			return {
				...state,
				loading: true,
				success: false,
				update: initialState.update,
				delete: initialState.delete,
				post: initialState.post,
			}
		case GET_ORDER_BY_USER_SUCCESS:
			return {
				...state,
				data: action.payload.data,
				loading: false,
				success: true,
			}
		case GET_ORDER_BY_USER_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error,
			}
		case DELETE_ORDER_STARTED:
			return {
				...state,
				delete: {
					...state.delete,
					loading: true,
					success: false,
					error: null,
				},
			}
		case DELETE_ORDER_SUCCESS:
			//* filters out deleted element from state
			return {
				...state,
				allOrders: [
					...state.allOrders.filter(
						(book) => book.id !== action.payload.data
					),
				],
				delete: {
					...state.delete,
					loading: false,
					success: true,
				},
			}
		case DELETE_ORDER_FAILURE:
			return {
				...state,
				delete: {
					...state.delete,
					loading: false,
					error: action.payload.error,
				},
			}
		case POST_ORDER_STARTED:
			return {
				...state,
				post: {
					...state.post,
					loading: true,
					success: false,
					error: null,
				},
			}
		case POST_ORDER_SUCCESS:
			return {
				...state,
				data: [...state.data, action.payload.data],
				post: {
					...state.post,
					loading: false,
					success: true,
				},
			}
		case POST_ORDER_FAILURE:
			return {
				...state,
				post: {
					...state.post,
					loading: false,
					error: action.payload.error,
				},
			}

		case GET_ALL_ORDERS_STARTED:
			return {
				...state,
				get: {
					...state.get,
					loading: true,
					success: false,
					error: null,
				},
			}
		case GET_ALL_ORDERS_SUCCESS:
			return {
				...state,
				allOrders: action.payload.data,
				get: {
					...state.get,
					loading: false,
					success: true,
				},
			}
		case GET_ALL_ORDERS_FAILURE:
			return {
				...state,
				get: {
					...state.get,
					loading: false,
					error: action.payload.error,
				},
			}

		default:
			return state
	}
}

export default ordersReducer
