import React, { useEffect, useState } from 'react';
import BASEURL from './API.js';

const Home = (props) => {
  const {loggedIn, token} = props;
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  
  useEffect(() => {
    const getPosts = async () => {
      try {
        const resp = await fetch(`${BASEURL}posts/`);
        const result = await resp.json();
        // console.log(result);
        const postArray = result.data.posts
        setPosts(postArray);
        console.log(postArray);
      } catch (error) {
        console.log(error)
      }
    }
    getPosts();
  }, [])

  const sendMessage = async (event, postId) => {
    event.preventdefault();
    try {
      const response = await fetch(`${BASEURL}/posts/${postId}`, {
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
    } catch (err) {
      console.log(err);
    }
  }

  return <>
    {loggedIn? <h1 id='welcome'>Welcome Back {loggedIn.username}.</h1> : <h1 id='welcome'>Welcome Guest</h1>}
    <div id='cards'>
      {posts && posts.map((post) => {
        return (
          <div key={post._id} id='post-card'>
            <h2>{post.title}</h2>
            <h3>Seller: {post.author.username}</h3>
            <h3>{post.price}</h3>
            <p>{post.description}</p>
            {(loggedIn && (post.author.username !== loggedIn.username))? <form>
              <input id='post-message' type='text' name={post._id} value={content} placeholder='Send the Seller a Message' onChange={(event) => setContent(event.target.value)} />
              <button type='submit' onClick={(event) => sendMessage(event, post._id)}>Send Message</button>
            </form> : null}
          </div>
        ) 
      })}
    </div>
  </>
}

export default Home;