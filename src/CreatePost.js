import React, { useState } from 'react'
import supabase from './client'
import { Nav } from './Nav'

export const CreatePost = () => {

  const [data, setData] = useState();

  function handleChange(e){
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setData(values => ({...values, [name]: value}))
  }

  async function handleSubmit(event){
    event.preventDefault();
    const {error} = await supabase
      .from('futbolhub')
      .insert(data)

    if(error){
      alert('could not create post')
    }  
    else{
      document.getElementById('content').value = ""
      document.getElementById('imageURL').value = ""
      document.getElementById('title').value = ""
    }    
  }

  return (
    <>
      <Nav/>
      <div className='create--form--container'>
        <form onSubmit={handleSubmit} className='create--post--form'>
          <label htmlFor='title'></label>
          <input type='text' id='title' name='title' placeholder='Title' required onChange={handleChange}></input>
          <label htmlFor='content'></label>
          <input type='text' id='content' name='content' placeholder='Content (Optional)' onChange={handleChange}></input>
          <label htmlFor='imageURL'></label>
          <input type='text' id='imageURL' name='imageURL' placeholder='Image URL (Optional)' onChange={handleChange}></input>
          <button type='submit' className='soccer--background create--post'>Create Post</button>
      </form>
    </div>

    </>

  )
}
