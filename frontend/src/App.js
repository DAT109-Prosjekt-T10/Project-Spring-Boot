import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	HashRouter,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Content from './components/content/Content'
import Header from './components/ui/Header'
import Footer from './components/ui/Footer'
import Background from './components/ui/Background'
import Login from './components/auth/Login/Login'
import Register from './components/auth/Register/Register'
import NotFound from './components/ui/NotFound'
import PrivateRoute from './config/PrivateRoute'

const App = () => {
	return (
		<Provider store={store}>
			<HashRouter>
				<main className='page-wrapper d-flex flex-column min-vh-100'>
					<Header />
					<Background />
					<Switch>
						<PrivateRoute exact path='/' component={Content} />
						<PrivateRoute exact path='/books' component={Content} />
						<PrivateRoute
							exact
							path='/authors'
							component={Content}
						/>
						<PrivateRoute
							exact
							path='/adminpanel'
							component={Content}
						/>
						<Route exact path='/login' component={Login} />
						<Route exact path='/register' component={Register} />
						<Route path='*' component={NotFound} />
					</Switch>
					<Footer />
				</main>
			</HashRouter>
		</Provider>
	)
}

export default App
