import { combineReducers } from 'redux'
import authors from './authors/authorReducer'
import books from './authors/booksReducer'

export default combineReducers({
	authors,
	books,
})
