import { combineReducers } from 'redux'
import user from './auth/userReducer'
import authors from './authors/authorsReducer'
import books from './books/booksReducer'
<<<<<<< HEAD
import orders from './orders/ordersReducer'
=======
import publishers from './publishers/publishersReducer'
>>>>>>> 5d21d2452bf0e342295f020a5a8d4bbb92969341

export default combineReducers({
	user,
	authors,
	books,
<<<<<<< HEAD
	orders,
=======
	publishers,
>>>>>>> 5d21d2452bf0e342295f020a5a8d4bbb92969341
})
