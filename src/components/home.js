import React, { useEffect, useState } from 'react';
import BASEURL from './API.js';

const Home = (props) => {
  const {loggedIn} = props;
  const {guest} = props;
  const [posts, setposts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const resp = await fetch(`${BASEURL}posts/`);
        const result = await resp.json();
        // console.log(result);
        const postArray = result.data.posts
        setposts(postArray);
        // console.log(postArray);
      } catch (error) {
        console.log(error)
      }
    }
    getPosts();
  }, [])

  return <>
    {loggedIn? <h1>Welcome Back {guest.username}.</h1> : <h1>Welcome Guest</h1>}
    {posts && posts.map((post, idx) => {
      return (
        <div key={idx}>
          <h2>{post.title}</h2>
          <h3>Seller: {post.author.username}</h3>
          <h3>{post.price}</h3>
          <p>{post.description}</p>
        </div>
      )
    })}
  </>
}

export default Home;