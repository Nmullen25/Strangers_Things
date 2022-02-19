import React, { useState } from 'react';
import BASEURL from './API.js';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Post = (props) => {
  const {token} = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const history = useHistory();

  const postListing = async(event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASEURL}/posts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          post: {
            title,
            description,
            price
          }
        })
      })

      const result = await response.json();
      console.log(result);
      history.push('/home');
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
      <form onSubmit={postListing}>
        <label htmlFor='title'>Title:</label>
        <br />
        <input type='text' name='title' placeholder='' value={title} onChange={(event) => setTitle(event.target.value)}/>
        <br />
        <label htmlFor='title'>Price:</label>
        <br />
        <input type='number' name='price' placeholder='$' value={price} onChange={(event) => setPrice(event.target.value)}/>
        <br />
        <label htmlFor='body'>Description:</label>
        <br />
        <input type='text' name='body' placeholder='' value={description} onChange={(event) => setDescription(event.target.value)}/>
        <br />
        <button type='submit'>Submit</button>
      </form>
  )
}

export default Post;