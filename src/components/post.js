import React, { useState } from 'react';
import BASEURL from './API.js';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Post = (props) => {
  const {token} = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [location, setLocation] = useState('');
  const history = useHistory();

  const postListing = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASEURL}posts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          post: {
            title,
            description,
            price,
            location
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
    <div id="edit-post-card">
      <h2>Submit Your Post</h2>
      <div id='edit-card' >
        <form onSubmit={postListing}>
          <label htmlFor='title' id='title'>Title:</label>
          <br />
          <input type='text' id='title-input' name='title' placeholder='' value={title} onChange={(event) => setTitle(event.target.value)}/>
          <br />
          <label htmlFor='location' id='location'>Location:</label>
          <br />
          <input type='text' id='location-input' name='location' placeholder='' value={location} onChange={(event) => setLocation(event.target.value)}/>
          <br />
          <label htmlFor='price' id='price'>Price:</label>
          <br />
          <input type='number' id='price-input' name='price' placeholder='$' value={price} onChange={(event) => setPrice(event.target.value)}/>
          <br />
          <label htmlFor='body' id='description'>Description:</label>
          <br />
          <textarea type='text' cols='25' rows='4' id='description-input' name='body' placeholder='' value={description} onChange={(event) => setDescription(event.target.value)}/>
          <br />
          <button id='buttons' type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Post;