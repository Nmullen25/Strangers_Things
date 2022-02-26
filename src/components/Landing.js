import React from "react";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Landing = () => {
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
    history.push('/home');
  }
  
  return <>
    <h1>Welcome to The Scrap Heap</h1>
    <button id='buttons' type='submit' onClick={clickLogin}>Login</button>
    <button id='buttons' type='submit' onClick={clickRegister}>Register</button>
    
    <br />
    <button id='buttons' type='submit' onClick={clickGuest}>Continue as Guest</button>
  </>
}

export default Landing;