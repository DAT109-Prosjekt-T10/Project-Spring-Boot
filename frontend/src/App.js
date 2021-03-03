import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Content from './components/content/Content'
import Header from './components/ui/Header'
import Footer from './components/ui/Footer'
import Background from './components/ui/Background'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import NotFound from './components/ui/NotFound'

const App = () => {
    return (
        <Router>
            <main className='page-wrapper d-flex flex-column min-vh-100'>
                <Header />
                <Background />
                <Switch>
                    <Route exact path='/' component={Content} />
                    <Route exact path='/books' component={Content} />
                    <Route exact path='/authors' component={Content} />
                    <Route exact path='/libraries' component={Content} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route path='*' component={NotFound} />
                </Switch>
                <Footer />
            </main>
        </Router>
    )
}

export default App
