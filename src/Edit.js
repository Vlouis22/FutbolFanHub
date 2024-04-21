import React, { useState } from 'react'
import supabase from './client'
import { Nav } from './Nav'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


export const Edit = () => {

    const [data, setData] = useState();
    let post_id = useParams().id;
    const [post, setPost] = useState()

    function handleChange(e){
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;
      setData(values => ({...values, [name]: value}))
    }

    useEffect(()=>{
        const getPost = async () =>{
          const {data, error} = await supabase
            .from('futbolhub')
            .select()
            .match({id: post_id})
           if(data){
              let tempData = data[0]
              setPost(tempData)
           } 
           else{
            console.log("An error occured: "+error)
           }
        }
        getPost()
    
    }, [])

    useEffect(()=>{
        function addData(){
            if(post){
                setData({title: post.title, imageURL: post.imageURL, content: post.content})
            }
        }
        addData()
    }, [post])

  
    async function handleSubmit(event){
      event.preventDefault();
      const {error} = await supabase
        .from('futbolhub')
        .update({title: data.title, imageURL: data.imageURL, content: data.content})
        .eq("id", post_id)
  
      if(error){
        alert('could not edit post')
      }  
      else{
        document.getElementById('content').value = ""
        document.getElementById('imageURL').value = ""
        document.getElementById('title').value = ""
        window.location = "/"
      }    
    }

  return (
        <>
          <Nav/>
          <div className='create--form--container'>
            { data ?
            <>
            <form onSubmit={handleSubmit} className='create--post--form'>
              <label htmlFor='title'></label>
              <input type='text' id='title' name='title' placeholder='Title' required onChange={handleChange} defaultValue={data.title}></input>
              <label htmlFor='content'></label>
              <input type='text' id='content' name='content' placeholder='Content (Optional)' onChange={handleChange} defaultValue={data.content}></input>
              <label htmlFor='imageURL'></label>
              <input type='text' id='imageURL' name='imageURL' placeholder='Image URL (Optional)' onChange={handleChange} defaultValue={data.imageURL}></input>
              <button type='submit' className='soccer--background create--post'>Update Post</button>
              </form>
              </> : <h1>Loading...</h1>
            }
        </div>
    
        </>
  )
}
