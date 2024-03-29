import { combineReducers } from 'redux'
import user from './auth/userReducer'
import authors from './authors/authorsReducer'
import books from './books/booksReducer'
import orders from './orders/ordersReducer'
import publishers from './publishers/publishersReducer'

export default combineReducers({
	user,
	authors,
	books,
	orders,
	publishers,
})
