import React, { useEffect, useState } from 'react'
import style from './PostList.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../../store/slices/posts'
import Post from '../Post/Post'

import { Pagination } from 'antd';
const PostList = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const dispath = useDispatch()
    let page = currentPage
    let limit = 4;
    let offset = limit * page; 
    useEffect(()=>{
        dispath(fetchPosts({offset,limit}))
    }, [currentPage])

    const articlesCount = useSelector(state=>{
        return state.posts.articles.articlesCount
    })

    const selectorPosts = useSelector(state=>{
        return state.posts.articles.articles
    })    
    const statusLoading = useSelector(state=>{
        return state.posts.status 
    })
    const handlePageChange = (page) => {
        setCurrentPage(page-1); // Обновляем текущую страницу

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
                    favorited={item.favorited}
                />
                )
            })

            :
            'wate a minute'
        }
        <div className={style.pagination}>
            <Pagination  align='center' onChange={handlePageChange} pageSize={limit} defaultCurrent={currentPage} total={articlesCount} /></div>

        </div>
  )
}

export default PostList
