import { combineReducers } from 'redux'
import authors from './authors/authorsReducer'
import books from './books/booksReducer'

export default combineReducers({
	authors,
	books,
})
