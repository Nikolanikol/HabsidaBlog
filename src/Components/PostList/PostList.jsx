import React, { useEffect, useState } from 'react'
import style from './PostList.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../../store/slices/posts'
import Post from '../Post/Post'

import { Pagination } from 'antd';
const PostList = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const dispath = useDispatch()

    useEffect(()=>{
        let page = currentPage
        let limit = 8;
        let offset = limit * page; 
        let total = 30/limit
        dispath(fetchPosts({offset,limit}))
    }, [currentPage])


    const selectorPosts = useSelector(state=>{
        console.log(state)
        return state.posts.articles.articles
    })    
    const statusLoading = useSelector(state=>{
        return state.posts.status 
    })
    const handlePageChange = (page) => {
        setCurrentPage(page); // Обновляем текущую страницу
        console.log(currentPage)
      };
  return (
    <div className='post-list'>
        {
            statusLoading === 'loaded' ? 
            selectorPosts.map((item,i)=>{
                return (
                <Post
                    id={item.id}
                    key={item.id}
                    slug={item.slug}
                    title={item.title}
                    likeCount={item.favoritesCount}
                    tagsArr={item.tagList}
                    userName={item.author.username}
                    createDate={item.createdAt}
                    desc={item.description}
                    img={item.author.image}
                />
                )
            })

            :
            'wate a minute'
        }
        <Pagination align='center' onChange={handlePageChange} defaultCurrent={currentPage} total={30} /></div>
  )
}

export default PostList
