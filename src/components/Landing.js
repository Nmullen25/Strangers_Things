import React from "react";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Landing = (props) => {
  const {setLoggedIn} = props;
  const history = useHistory();

  const clickRegister = (event) => {
    event.preventDefault();
    history.push('/register');
  }

  const clickLogin = (event) => {
    event.preventDefault();
    history.push('/login');
  }

  const clickGuest = (event) => {
    event.preventDefault();
    setLoggedIn(false);
    history.push('/home');
  }
  
  return <>
    <h1>Landing</h1>
    <button type='submit' onClick={clickRegister}>Register</button>
    <button type='submit' onClick={clickLogin}>Login</button>
    <br />
    <button type='submit' onClick={clickGuest}>Continue as Guest</button>
    
  </>
}

export default Landing;