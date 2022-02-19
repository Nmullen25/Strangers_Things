import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { BASEURL } from '.';

const Login = (props) => {
  const {setToken, setGuest, loggedIn, setLoggedIn} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch (`${BASEURL}/users/login/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            username,
            password
          }
        })
      })

      const result = await response.json();
      console.log(result);
      setLoggedIn(true);
      console.log(loggedIn);
      setToken(result.data.token);
      setGuest({username});
      
      console.log(username);
      
      console.log(loggedIn);

      history.push('/home');
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div id='container'>
      <div id='navbar'>
        
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>UserName: </label>
        <input type='text' name='username' placeholder='username' value={username} onChange={(event) => setUsername(event.target.value)}/>
        <br />
        <label htmlFor='password'>Password: </label>
        <input type='password' name='password' placeholder='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
        <br />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login;