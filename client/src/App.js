import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layouts/Alert';
import PrivateRoute from './components/routing/PrivateRoute';
import ContactState from './context/contacts/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import setAuthToken from './utils/setAuthToken';
if (localStorage.token) {
	setAuthToken(localStorage.token);
}
function App() {
	return (
		<AuthState>
			<AlertState>
				<ContactState>
					<Router>
						<Fragment>
							<Navbar />
							<div className='container'>
								<Alert />
								<Switch>
									<PrivateRoute exact path='/' component={Home} />
									<Route exact path='/about' component={About} />
									<Route exact path='/register' component={Register} />
									<Route exact path='/login' component={Login} />
								</Switch>
							</div>
						</Fragment>
					</Router>
				</ContactState>
			</AlertState>
		</AuthState>
	);
}

export default App;
