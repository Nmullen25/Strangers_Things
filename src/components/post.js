import React from 'react';

const Post = () => {
  return (
    <div id='container'>
      <div id='navbar'>
        
      </div>
      <form>
        <label htmlFor='title'>Title:</label>
        <input type='text' name='title' defaultValue='title'/>
        <label htmlFor='body'>Body:</label>
        <input type='text' name='body' defaultValue='body'/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Post;