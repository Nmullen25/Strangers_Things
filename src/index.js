import React, { useState } from 'react';
import {Link, Route, BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { Title, Home, Post, Profile, Register, Login, Landing } from './components';

const Main = () => {
  const [token, setToken] = useState('');
  const [guest, setGuest] = useState(null);
  console.log(token);
  
  const Logout = () => {
    console.log(token);
    setGuest(null);
    console.log(guest);
  }

  return (
    <div>
      <Title />
      <div id='navbar'>
        {guest? <Link id='navlink' to="/home">Home</Link> : null }
        {guest? <Link id='navlink' to="/post">Post</Link> : null }
        {guest? <Link id='navlink' to="/profile">{guest.username}</Link> : <Link id='navlink' to="/login">Login</Link>}
        {guest? <Link id='navlink' to="/" onClick={Logout}>Logout</Link> : <Link id='navlink' to="/register">Register</Link>}
      </div>
      
      <br />
      <Route exact path='/'>
        <Landing />
      </Route>
      <Route path='/register'>
        <Register setGuest={setGuest} setToken={setToken} />
      </Route>
      <Route path='/login'>
        <Login setGuest={setGuest} setToken={setToken} />
      </Route>
      <Route path='/home'>
        <Home guest={guest} />
      </Route>
      <Route path='/post'>
        <Post token={token}/>
      </Route>
      <Route path='/profile'>
        <Profile token={token}/>
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
