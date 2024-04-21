import React, { useState, useEffect } from 'react'
import { calculateTimeAgo } from '../TimeUtils';


export const Post = (props) => {

    const [timeAgo, setTimeAgo] = useState(0)

    let possibleLinkURL = `/post/${props.id}`;

    useEffect(() => {
        const timePosted = new Date(props.timeAgo);
        setTimeAgo(calculateTimeAgo(timePosted));
    }, [props.timeAgo]);


    return (
        <a href={possibleLinkURL} className='unstyled single--post--container '>
            <div>
                <p>posted {timeAgo}</p>
                <h1>{props.title}</h1>
                <p>{props.upVotes || 0} upvotes</p>
            </div>
        </a>
    )
}

