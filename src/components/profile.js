import React, { useEffect, useState } from 'react';
import BASEURL from './API.js';
import { useHistory } from 'react-router-dom';

const Profile = (props) => {
  const {token} = props;
  const [userPosts, setUserPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isPostEdit, setIsPostEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState();
  const [postToEdit, setPostToEdit] = useState([]);
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
  
  const editPost = async (event, postId) => {
    console.log("editpost");
    event.preventDefault();

    try {
      const response = await fetch(`${BASEURL}/users/me/${postId}`, {
        method: "PATCH",
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
      setIsPostEdit(false);
      history.push('/home');
    } catch (error) {
      console.log(error);
    }

  }

  const postView = () => {
    return <div id='profile-page'>
      <div id='posts'>
        <h2>Your Posts</h2>
        <div id='cards'>
          {userPosts && userPosts.map((post, idx) => {
            return (
              <div key={idx} id="post-card">
                <h2>{post.title}</h2>
                <h3>{post.price}</h3>
                <p>{post.description}</p>
                <p>{post._id}</p>
                <button id='buttons' type="submit" onClick={(event) => deletePost(event, post._id)}>Delete</button>
                {isPostEdit? <button type="submit" onClick={(event) => editView(event, post._id)}>Edit</button> : null}
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
      </div>
      <aside id='messages'>
        <div>
          <h2>Messages</h2>
        </div>
      </aside>
    </div>
  }

  const editView = async (event, postId) => {
    event.preventDefault();
    console.log("editview");
    
    try {
      const resp = await fetch(`${BASEURL}/posts/`)
      const result = await resp.json();
      const activeEdit = result.data.posts.filter(post => post._id === postId);
      setPostToEdit(activeEdit);
      setIsPostEdit(true);
    } catch (err) {
      console.log(err);
    }

    return <>
      {postToEdit && postToEdit.map((post, idx) => {
        return (
          <div id="edit-post-card"key={idx}>
            <h2>Edit Your Post</h2>
            <div id='post-card' >
              <form>
                <label htmlFor='title'>Title:</label>
                <br />
                <input type='text' name='title' defaultvalue={post.title} value={title} onChange={(event) => setTitle(event.target.value)}/>
                <input type='number' name='price' defaultvalue={postToEdit.price} value={price} onChange={(event) => setPrice(event.target.value)}/>
                <input type='text' name='description' defaultvalue={postToEdit.description} value={description} onChange={(event) => setDescription(event.target.value)}/>
                <button type="button" onClick={(event) => editPost(event, postToEdit._id)}>Update</button>
              </form>
            </div>
          </div>
        )}
      )
    }
  </>
  }
  return <>
    {isPostEdit? null : postView()}
  </>
}

export default Profile;