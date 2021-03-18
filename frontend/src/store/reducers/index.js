import { combineReducers } from 'redux'
import register from './auth/registerReducer'
import authors from './authors/authorsReducer'
import books from './books/booksReducer'

export default combineReducers({
	register,
	authors,
	books,
})
