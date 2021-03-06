import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { BASEURL } from '.';

const Login = (props) => {
  const {setToken, setLoggedIn} = props;
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
      setToken(result.data.token);
      setLoggedIn({username});
      history.push('/home');
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div id='container'>
      <div id='navbar'>
        
      </div>
      <div id='login'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>UserName: </label>
          <br />
          <input type='text' id='username-input' name='username' placeholder='username' value={username} onChange={(event) => setUsername(event.target.value)}/>
          <br />
          <label htmlFor='password'>Password: </label>
          <br />
          <input type='password' id='password-input' name='password' placeholder='password' value={password} onChange={(event) => setPassword(event.target.value)}/>
          <br />
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login;