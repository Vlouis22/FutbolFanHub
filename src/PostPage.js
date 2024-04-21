import React from 'react'
import { Nav } from './Nav'
import { useState, useEffect } from 'react';
import supabase from './client';
import { useParams } from 'react-router-dom';
import { calculateTimeAgo } from './TimeUtils';
import { Comment } from './components/Comment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import YouTube from 'react-youtube';
import RecommendIcon from '@mui/icons-material/Recommend';


export const PostPage = () => {

    const [post, setPost] = useState();
    const [timeAgo, setTimeAgo] = useState(0);
    let id_ = useParams().id;
    const [change, setChange] = useState('')
    const [isVideo, setIsVideo] = useState(-1)

    useEffect(()=>{
      const getPost = async () =>{
  
        const {data, error} = await supabase
          .from('futbolhub')
          .select()
          .match({id: id_})
         if(data){
            console.log(data)
            setPost(data[0])
         } 
         else{
          console.log("An error occured: "+error)
         }
      }
      getPost()
  
    }, [change])

    useEffect(() => {
        if(post){
            const timePosted = new Date(post.created_at);
            setTimeAgo(calculateTimeAgo(timePosted));
        }
    }, [post]);
 
    async function addComment(event, comment){
      if(comment){
        let prevComments = post.comments;
        prevComments = prevComments ? prevComments.push(comment) : [comment]
        const {error} = await supabase
          .from('futbolhub')
          .update({comments: prevComments})
          .eq('id', post.id)
      
      if(error){
        console.log("unable to comment under this post")
      }
      else{
        setChange(comment)
      }
    }
  }

  useEffect(()=>{
    function getMediaType(){
      if(post){
        if(post.imageURL){
          console.log(post.imageURL)
          if(post.imageURL.length === 11){
            setIsVideo(1)
          }
          else{
            setIsVideo(0)
          }
        }

      }
    }
    getMediaType()
  }, [post])



    async function updateUpvotes(){
      let newLikeCount = post.numberOfUpvotes;
      newLikeCount++;
      const {error} = await supabase
        .from('futbolhub')
        .update({numberOfUpvotes: newLikeCount})
        .eq('id', post.id)

      if(error){
        console.log("something went wrong")
      }
      else{
        setChange(post.numberOfUpvotes)
      }
    }
    
    async function deletePost(){
      const { error } = await supabase
        .from('futbolhub')
        .delete()
        .eq('id', id_)

      if(error){
        alert('something went wrong')
      }
      else{
        window.location = '/'
      }  
    }
  
  function EditPost(){
    window.location = `/edit/${post.id}`
  }


  return (
    <>
    <Nav/>
    <div className='create--form--container'>
        <div className='create--post--form single--post--main'>
            { post ? (
                <>
                <div className='post--container--buttons'>
                <p>posted {timeAgo}</p>
                  <div>
                  <EditIcon className='edit--icon' onClick={EditPost}/>
                  <DeleteForeverIcon className='deleted--icon' onClick={deletePost}/>
                  </div>
                </div>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                {isVideo === 0 ? <img src={post.imageURL} className='post--image'></img>: null}
                {isVideo == 1 ? <YouTube videoId={post.imageURL} opts={{autoplay: 1}}/>: null}
                <p className='upvote--vote'>
                  <div onClick={updateUpvotes}><RecommendIcon/></div> {post.numberOfUpvotes || 0} upvotes
                </p>
                <Comment  comments={post.comments} addComment={addComment}/>
                </>
            ) : <h1>loading...</h1>
            }
        </div>
    </div>
    </>
  )
}
