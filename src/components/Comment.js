import React, { useState } from 'react'

export const Comment = (props) => {

    const [comment, setComment] = useState('');

    function handleChange(e){
        e.preventDefault();
        setComment(e.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.addComment(event, comment);
        setComment('');
    }


  return (
    <div className='post--comment'>
        <div className='comments--list'>

        {
            props.comments && 
            props.comments.map((comment, index) =>(
                <div key={index}>- {comment}</div>
            )
            )
        }
        <form onSubmit={handleSubmit}>
            <input value={comment} onChange={handleChange} placeholder='Leave a comment...'></input>
        </form>
        </div>

    </div>
  )
}
