import React from 'react'; 
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import fetch from 'isomorphic-fetch';
import Tagger from './Tagger';

class Login extends React.Component {  
  constructor(props) { 
    super(props); 
    this.state = { 
      username: '', 
      password: '',
      loggedIn: false
    }
    this.onChange = this.onChange.bind(this); 
    //this.loginPostRequest = this.loginPostRequest.bind(this); 
  }

  loginPostRequest = (route) => { 
    fetch(route, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({username: this.state.username, password: this.state.password}), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      console.log(myJson);
      // console.log(this);
      this.setState({loggedIn: true}); 
    });
  }  

  onChange = (key, value) => {
    this.setState({[key]: value})
  }

  render() {
    if (this.state.loggedIn === true) { 
      console.log("Hello"); 
      return <Redirect to={{
        pathname: '/feed'
      }}/>
    }//end if

    return ( 
      <div>
        <h1>Login</h1> 
        <input placeholder="Username" onChange={(e) => this.onChange('username', e.target.value)}></input>
        <span><input placeholder="Password" onChange={(e) => this.onChange('password', e.target.value)}></input></span>
        <span><button id="login" onClick={() => this.loginPostRequest('/login')}>Login</button></span>
        <span><button id="singup" onClick={() => this.loginPostRequest('/signup')}>Sign Up</button></span>
      </div>    
    );
  }
}

export default Login;