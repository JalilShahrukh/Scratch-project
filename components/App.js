import React, { Component } from 'react';
import Tagger from './Tagger';
import Login from './Login'; 
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import './styles.css';

class App extends Component {
  render(){
    return (
			<div>
				<Router>
          <div>
        		<Route exact path='/' component={Login} />
						<Route path='/feed' component={Tagger} />
					</div>
				</Router>
      </div>
    );
  }
}

export default App;
