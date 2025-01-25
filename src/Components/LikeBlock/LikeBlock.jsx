import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLike } from '../../store/slices/posts'
import axios from "../../http/index";
import likeIcon from "./like-icon.svg";
import like from "./like.svg";
const LikeBlock = ({slug, likeCount,isFavorite}) => {

    const [favorite, setFavorite] = useState(isFavorite)
    const [postLike, setPostLike] = useState(likeCount)
  const dispatch = useDispatch()
  const handleLike = async (slug) => {
    dispatch(setLike(slug))
    setFavorite(!favorite)
    if(favorite){
        await axios.delete(`/articles/${slug}/favorite`)
        .then((data) => setPostLike(postLike-1))
          .catch((e) => console.log(e));
    }else{
        await axios.post(`/articles/${slug}/favorite`)
        .then((data) => setPostLike(postLike+1))
          .catch((e) => console.log(e));
        
    }
  };


  return (
    <div className="post__like">
        <button onClick={()=>handleLike(slug)}>
        <img src={favorite?like : likeIcon} alt="" />
        <span>{postLike}</span>
        </button>
    </div>
  )
}

export default LikeBlock
