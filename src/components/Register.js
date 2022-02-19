import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { BASEURL } from '.';

const Register = (props) => {
  const {setToken} = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch (`${BASEURL}/users/register`, {
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
    setToken(result.data.token);

    history.push('/login');
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
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register;