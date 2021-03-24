import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import './components/assets/scss/theme.scss'
import './index.scss'

import 'bootstrap'

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('startTarget')
)
