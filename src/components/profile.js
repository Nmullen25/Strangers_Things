import React, { useEffect, useState } from 'react';
import BASEURL from './API.js';
import { useHistory } from 'react-router-dom';

const Profile = (props) => {
  const {token, userPosts, setUserPosts} = props;
  const [messages, setMessages] = useState([]);
  const history = useHistory();

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
      
      const activePosts = result.data.posts.filter(post => post.active)
      setUserPosts(activePosts);
      const allMessages = result.data.messages;
      const activePostIds = [];

      for (let i = 0; i < activePosts.length; i++) {
        activePostIds.push(activePosts[i]._id)
      };

      const activeMessages = []
      for (let j = 0; j < allMessages.length; j++) {
        if (activePostIds.includes(allMessages[j].post._id)) {
          activeMessages.push(allMessages[j]);
        }
      }

      setMessages(activeMessages);
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
      getUserPosts();
    } catch (err) {
      console.log(err);
    }
  }

  const clickEdit = (event, postId) => {
    event.preventDefault();
    history.push(`/profile/${postId}`);
  }

  return <div id='profile-page'>
    <div id='posts'>
      <h2>Your Posts</h2>
      <div id='cards'>
        {userPosts && userPosts.map((post, idx) => {
          return (
            <div key={idx} id="post-card">
              <h2>{post.title}</h2>
              <h3>Located In: {post.location}</h3>
              <h3>Price: ${post.price}</h3>
              <p>{post.description}</p>
              <button id='buttons' type="submit" onClick={(event) => deletePost(event, post._id)}>Delete</button>
              <button type="submit" onClick={(event) => clickEdit(event, post._id)}>Edit</button>
              {post.messages? post.messages && post.messages.map((message, idx) => {
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
    </div>
    <aside id='messages'>
      <h2>All Messages</h2>
      <div id='message-cards'>
        {messages? messages && messages.map((message, idx) => {
                return (
                  <div key={idx} id='message'>
                    <h2>Post: {message.post.title}</h2>
                    <h3>From: {message.fromUser.username}</h3>
                    <p>{message.content}</p>
                  </div>
                )
              }) : <h2>No messages to view.</h2>}
      </div>
    </aside>
  </div>
  

}

export default Profile;