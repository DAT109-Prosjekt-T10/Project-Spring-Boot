import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'
import reducers from './reducers'

const store = createStore(
	reducers,
	{},
	(process.env.NODE_ENV = 'development'
		? composeWithDevTools(applyMiddleware(reduxThunk))
		: applyMiddleware(reduxThunk))
)

export default store
