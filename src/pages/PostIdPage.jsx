import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import axios from '../http/index'
import likeIcon from './like-icon.svg'
import userIcon from './user-icon.svg'
import { marked } from 'marked';
import MarkdownViewer from '../utils/MarkdownComponent/markdown'
import { format } from "date-fns";

const PostIdPage = () => {
    const {slug} = useParams()
  const [data, setData] = useState()
  const [loading, setIsLoading] = useState(true)

    useEffect(()=>{
        axios.get(`/articles/${slug}`)
            .then(res=>setData(res.data.article))
            .catch(err=>{
                console.log(err)
                alert('Ошибка при получении статьи')
            })
            .finally(()=>setIsLoading(false))


    }, [])
    const formattedDate = loading? '' : format(new Date(data.createdAt), "MMMM d, yyyy");


  return (
    
        loading ? 
        'loading'
        :
        <div className='post-id-wrapper' >
            <div style={{'height': '100%'}} className='post'>
        <div className="post__header">
            <div className="post__row">
                <div className="post__title-row">
                    <div className="title__row">
                        <div  className="post__title">{data.slug}</div>
                        <div className="post__like"><button> <img src={likeIcon} alt="" /> <span>{data.favoritesCount}</span></button></div>
                    </div>
                    <div className="tag__row">

                            {
                                data.tagList.map((tag, i)=>{
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
                        <div className="user_name">{data.author.userName}</div>
                        <div className="user-date">{formattedDate}</div>
                    </div>
                    <img src={data.author.image ?data.author.image :userIcon} alt="" />
                </div>
            </div>
        </div>
        <div className="post__body">
            <p>{data.description} </p>
        </div>
        <div className='mark'>
                            <MarkdownViewer markdownText={data.body}/>
        </div>
                            
            </div>
        </div>
    
   
  )
}

export default PostIdPage
