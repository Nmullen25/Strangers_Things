import React, { useState } from 'react';
import {Link, Route, BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { Title, Home, Post, Profile, Register, Login, Landing, SinglePost, EditView } from './components';


const Main = () => {
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  console.log(token);
  
  const Logout = () => {
    console.log(token);
    setLoggedIn(null);
    console.log(loggedIn);
  }

  return (
    <div>
      <Title />
      <div id='navbar'>
        {loggedIn? <Link id='navlink' to="/home">Home</Link> : null }
        {loggedIn? <Link id='navlink' to="/post">Post</Link> : null }
        {loggedIn? <Link id='navlink' to="/profile">{loggedIn.username}</Link> : <Link id='navlink' to="/login">Login</Link>}
        {loggedIn? <Link id='navlink' to="/" onClick={Logout}>Logout</Link> : <Link id='navlink' to="/register">Register</Link>}
      </div>
      
      <br />
      <div id='display-area'>
        <Route exact path='/'>
          <Landing />
        </Route>
        <Route path='/register'>
          <Register setToken={setToken} />
        </Route>
        <Route path='/login'>
          <Login setLoggedIn={setLoggedIn} setToken={setToken} />
        </Route>
        <Route exact path='/home'>
          <Home posts={posts} setPosts={setPosts} token={token} loggedIn={loggedIn} />
        </Route>
        <Route exact path='/home/:postId'>
          <SinglePost posts={posts} token={token} loggedIn={loggedIn} />
        </Route>
        <Route path='/post'>
          <Post token={token}/>
        </Route>
        <Route exact path='/profile/:postId'>
          <EditView token={token} userPosts={userPosts} />
        </Route>
        <Route exact path='/profile'>
          <Profile token={token} userPosts={userPosts} setUserPosts={setUserPosts} />
        </Route>
      </div>
    </div>
  )
}

ReactDOM.render(
  <Router>
    <Main />
  </Router>, 
  document.getElementById("app")
)
