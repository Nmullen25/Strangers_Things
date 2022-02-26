import React, { useState } from 'react';
import BASEURL from './API.js';
import { useHistory, useParams } from 'react-router-dom';

const EditView = (props) => {
  const {userPosts, token} = props;
  const {postId} = useParams();
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const history = useHistory();
  
  const [activeEdit] = userPosts.filter(post => post._id === postId);

  const editPost = async (event, postId) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BASEURL}posts/${postId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          post: {
            title: newTitle,
            description: newDescription,
            price: newPrice,
            location: newLocation
          }
        })
      })

      const result = await response.json();
      history.push('/profile');
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div id="edit-post-card" key={activeEdit._id}>
      <h2>Edit Your Post</h2>
      <div id='edit-card' >
        <form>
          <label htmlFor='title'>Current Title: {activeEdit.title}</label>
          <br />
          <input type='text' id='title-input' name='title' value={newTitle} onChange={(event) => setNewTitle(event.target.value)}/>
          <br />
          <label htmlFor='location'>Current Location: {activeEdit.location}</label>
          <br />
          <input type='text' id='location-input' name='location' value={newLocation} onChange={(event) => setNewLocation(event.target.value)}/>
          <br />
          <label htmlFor='price'>Current Price: ${activeEdit.price}</label>
          <br />
          <input type='text' id='price-input' name='price' value={newPrice} onChange={(event) => setNewPrice(event.target.value)}/>
          <br />
          <label htmlFor='description'>Current Description: {activeEdit.description}</label>
          <br />
          <textarea type='text' cols='25' rows='4' id='description-input' name='description' value={newDescription} onChange={(event) => setNewDescription(event.target.value)}/>
          <br />
          <button type="button" onClick={(event) => editPost(event, activeEdit._id)}>Update</button>
        </form>
      </div>
    </div>
  )

}

export default EditView;