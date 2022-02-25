import React, { useState } from 'react';
import BASEURL from './API.js';
import { useHistory, useParams } from 'react-router-dom';

const SinglePost = (props) => {
  const { postId } = useParams();
  const {loggedIn, token, posts} = props;
  const [message, setMessage] = useState('');
  const history = useHistory();
  
  const [post] = posts.filter(post => post._id === postId);
  console.log(postId);
  console.log(message);
  console.log(post);

  const sendMessage = async (event) => {
    event.preventDefault();
    console.log('clicked');
    try {
      const response = await fetch(`${BASEURL}posts/${postId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: {
            content: `${message}`,
          }
        })
      })

      const result = await response.json();
      console.log(result);
      history.push('/home');
    } catch (err) {
      console.log(err);
    }
  }

  const clickBack = () => {
    history.push('/home');
  }


  return (
    <div key={postId}  id='cards'>
      <div id='post-card'>
        <h2>{post.title}</h2>
        <h3>Seller: {post.author.username}</h3>
        <h3>{post.price}</h3>
        <p>{post.description}</p>
        {(loggedIn && (post.author.username !== loggedIn.username))? <form >
        <input id='post-message' type='text' name='message' value={message} placeholder='Send the Seller a Message' onChange={(event) => setMessage(event.target.value)} />
        <button type='' onClick={sendMessage}>Send Message</button>
        </form> : null}
        <button type='submit' onClick={clickBack}>Back to Home</button>
      </div> 
    </div>
  )
}

export default SinglePost;