import React from 'react'
import style from './Post.css'
import userIcon from './user-icon.svg';
import likeIcon from './like-icon.svg';
import { Link } from 'react-router-dom'
import { format } from "date-fns";

const Post = ({title, likeCount, tagsArr, userName, createDate, desc,id,slug,img}) => {
    const formattedDate = format (new Date(createDate), "MMMM d, yyyy");

  return (
    <div className='post'>
        <div className="post__header">
            <div className="post__row">
                <div className="post__title-row">
                    <div className="title__row">
                        <Link to={`/post/${slug}`} className="post__title">{title}</Link>
                        <div className="post__like"><button> <img src={likeIcon} alt="" /> <span>{likeCount}</span></button></div>
                    </div>
                    <div className="tag__row">

                            {
                                tagsArr.map((tag, i)=>{
                                    return(
                                        <div key={i} className='tag__item'>
                                            {tag}
                                        </div>
                                    )
                                })
                            }

                    </div>
                </div>
                <div className="post__user-row">
                    <div className="text__row">
                        <div className="user_name">{userName}</div>
                        <div className="user-date">{formattedDate}</div>
                    </div>
                    <img src={img?img : userIcon} alt="" />
                </div>
            </div>
        </div>
        <div className="post__body">
            <p>{desc} </p>
        </div>
      
    </div>
  )
}

export default Post
