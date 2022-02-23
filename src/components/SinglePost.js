import React, { useState } from 'react';
import BASEURL from './API.js';
import { useHistory, useParams } from 'react-router-dom';

const SinglePost = (props) => {
  const { postId } = useParams();
  const {loggedIn, token, posts} = props;
  const [content, setContent] = useState('');
  const history = useHistory();
  
  const post = posts.filter(post => post._id === postId)

  const sendMessage = async (event, postId) => {
    event.preventdefault();
    try {
      const response = await fetch(`${BASEURL}/posts/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: {
            content
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

  return <>
    {post && post.map((post, idx) => {
      return (
        <div key={idx}  id='single-post-card'>
          <div id='post-card'>
            <h2>{post.title}</h2>
            <h3>Seller: {post.author.username}</h3>
            <h3>{post.price}</h3>
            <p>{post.description}</p>
            {(loggedIn && (post.author.username !== loggedIn.username))? <form>
            <input id='post-message' type='text' name='message' value={content} placeholder='Send the Seller a Message' onChange={(event) => setContent(event.target.value)} />
            <button type='submit' onClick={(event) => sendMessage(event, post._id)}>Send Message</button>
            </form> : null}
          </div> 
        </div>
      )
    })}
  </>
}

export default SinglePost;