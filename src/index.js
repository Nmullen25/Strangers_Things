import React, { useState } from 'react';
import {Link, Route, BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { Title, Home, Post, Profile, Register, Login, Landing } from './components';

const Main = () => {
  const [token, setToken] = useState('');
  const [guest, setGuest] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(loggedIn);
  console.log(token);
  
  const Logout = (event) => {
    event.preventDefault();
    setLoggedIn(false);
    console.log(token);
    setGuest({});
    console.log(guest);
    console.log('loggedin', loggedIn);
  }

  return (
    <div>
      <Title />
      <div id='navbar'>
        <Link id='navlink' to="/home">Home</Link>
        <Link id='navlink' to="/post">Post</Link>
        {loggedIn? <Link id='navlink' to="/profile">{guest.username}</Link> : <Link id='navlink' to="/login">Login</Link>}
        {loggedIn? <Link id='navlink' to="/" onClick={Logout}>Logout</Link> : <Link id='navlink' to="/register">Register</Link>}
      </div>
      
      <br />
      <Route exact path='/'>
        <Landing setLoggedIn={setLoggedIn} />
      </Route>
      <Route path='/register'>
        <Register setGuest={setGuest} setToken={setToken} />
      </Route>
      <Route path='/login'>
        <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} setGuest={setGuest} setToken={setToken} />
      </Route>
      <Route path='/home'>
        <Home guest={guest} loggedIn={loggedIn} />
      </Route>
      <Route path='/post'>
        <Post token={token}/>
      </Route>
      <Route path='/profile'>
        <Profile />
      </Route>
    </div>
  )
}

ReactDOM.render(
  <Router>
    <Main />
  </Router>, 
  document.getElementById("app")
)
