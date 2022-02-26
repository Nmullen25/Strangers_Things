import React, { useEffect } from 'react';
import BASEURL from './API.js';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';

const Home = (props) => {
  const {loggedIn, posts, setPosts} = props;
  const history = useHistory();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const searchTerm = searchParams.get('searchTerm') || '';

  useEffect(() => {
    const getPosts = async () => {
      try {
        const resp = await fetch(`${BASEURL}posts/`);
        const result = await resp.json();
        const postArray = result.data.posts
        setPosts(postArray);
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

  const postMatches = (post, searchTerm) => {
    const { title, location, description, author: {username} } = post;

    const toCheck = [ title, location, description, username];

    for (const field of toCheck) {
      if (field.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
    }
  }

  const filteredPosts = posts.filter(post => postMatches(post, searchTerm));

  return <>
    {loggedIn? <h1 id='welcome'>Welcome Back {loggedIn.username}.</h1> : <h1 id='welcome'>Welcome Guest</h1>}
    <input type='text' placeholder='Search Posts' onChange={(event) => history.push(event.target.value? `/home?searchTerm=${event.target.value}` : '/home')}/>
    <div id='cards'>
      {filteredPosts && filteredPosts.map((post) => {
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