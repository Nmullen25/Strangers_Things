import React, { useEffect } from 'react';
import BASEURL from './API.js';
import { useHistory } from 'react-router-dom';

const Home = (props) => {
  const {loggedIn, posts, setPosts} = props;
  const history = useHistory();

  useEffect(() => {
    const getPosts = async () => {
      try {
        const resp = await fetch(`${BASEURL}posts/`);
        const result = await resp.json();
        const postArray = result.data.posts
        setPosts(postArray);
        console.log(postArray);
      } catch (error) {
        console.log(error)
      }
    }
    getPosts();
  }, [])

  const clickView = (event, postId) => {
    event.preventDefault();
    history.push(`/home/${postId}`);
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
            <button id='view-button' onClick={(event) => clickView(event, post._id)}>View Post</button>
          </div>
        ) 
      })}
    </div>
  </>
}

export default Home;