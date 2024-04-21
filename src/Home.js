import React, { useEffect, useState } from 'react'
import supabase from './client';
import { Post } from './components/Post';

export const Home = (props) => {

    const [posts, setPosts] = useState();
    const [searchData, setSearchData] = useState();
    const [date, setDate] = useState()

    useEffect(()=>{
      const getPosts = async () =>{
        const {data, error} = await supabase
          .from('futbolhub')
          .select()
        
         if(data){
          setPosts(data)
         } 
         else{
          console.log("An error occured: "+error)
         }
      }
      getPosts()
  
    }, [])

    useEffect(()=>{
      if(posts){
        if(props.input){
          const result = posts.filter((isMatch))
          setSearchData(result)
        }
        else{
          setSearchData(posts);
        }
      }
    }, [props.input])

    function isMatch(post){
      return post.title.toLowerCase().includes(props.input.toLowerCase())
    }


  function sortByNewest(){
    let sorted =  posts.sort(function(a, b) {return new Date(b.created_at) - new Date(a.created_at)});
    setPosts(sorted);
    setDate(new Date())
  }

  function sortByPopularity(){
    let sorted = posts.sort(function(a,b) {return b.numberOfUpvotes - a.numberOfUpvotes})
    setPosts(sorted);
    setDate(new Date())
    console.log(posts)
  }



  return (
    <div className='home--container'>
      <div className='order--by'>
        Order by:  
        <button className='soccer--background' onClick={sortByNewest}>Newest</button>
        <button className='soccer--background' onClick={sortByPopularity}>Most popular</button>
      </div>
      {
        posts &&
        searchData ?         
        searchData.map( post =>(
          <Post  key={post.id} title={post.title} upVotes={post.numberOfUpvotes} timeAgo={post.created_at} id={post.id}/>
        )) 
        :
        posts && 
        posts.map( post =>(
          <Post  key={post.id} title={post.title} upVotes={post.numberOfUpvotes} timeAgo={post.created_at} id={post.id}/>
        )) 
      }

    </div>
  )
}
