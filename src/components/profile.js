import React, { useEffect, useState } from 'react';
import BASEURL from './API.js';

const Profile = (props) => {
  const {token} = props;
  const [userPosts, setUserPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const getUserPosts = async () => {
    try {
      const resp = await fetch(`${BASEURL}users/me`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      const result = await resp.json();
      console.log(result);
      
      const activePosts = result.data.posts.filter(post => post.active)
      setUserPosts(activePosts);
      setMessages(activePosts.messages);

    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getUserPosts();
  }, [token])

  const deletePost = async (event, postId) => {
    event.preventDefault();
    try {
      const resp = await fetch(`${BASEURL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      const result = await resp.json();
      console.log(result);
      getUserPosts();
    } catch (err) {
      console.log(err);
    }
  }
  
  return <>
    <div id='posts'>
      <h2>Posts</h2>
      {userPosts && userPosts.map((post, idx) => {
        return (
          <div key={idx}>
            <h2>{post.title}</h2>
            <h3>Seller: {post.author.username}</h3>
            <h3>{post.price}</h3>
            <p>{post.description}</p>
            <p>{post._id}</p>
            <button type="submit" onClick={(event) => deletePost(event, post._id)}>Delete</button>
            {messages? messages && messages.map((message, idx) => {
              return (
                <div key={idx}>
                  <h3>From: {message.fromUser.username}</h3>
                  <p>{message.content}</p>
                </div>
              )
            }) : null}
          </div>
        )
      })}
    </div>
  </>
}

export default Profile;