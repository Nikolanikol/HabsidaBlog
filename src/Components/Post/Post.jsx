import React, { useState } from "react";
import style from "./Post.css";
import userIcon from "./user-icon.svg";

import { Link } from "react-router-dom";
import { format } from "date-fns";
import { capitalizeFirstLetter } from "../../utils/capitalize";
import { useDispatch, useSelector } from "react-redux";
import { setLike } from "../../store/slices/posts";
import LikeBlock from "../LikeBlock/LikeBlock";
const Post = ({
  title,
  likeCount,
  tagsArr,
  userName,
  createDate,
  desc,
  slug,
  img,
  favorited,
}) => {
  const formattedDate = format(new Date(createDate), "MMMM d, yyyy");
    console.log(favorited, 'favorited')
  return (
    <div className="post">
      <div className="post__header">
        <div className="post__row">
          <div className="post__title-row">
            <div className="title__row">
              <Link to={`/post/${slug}`} className="post__title">
                {capitalizeFirstLetter(title)}
              </Link>


            <LikeBlock slug={slug} isFavorite={favorited}likeCount={likeCount}/>
            </div>
            <div className="tag__row">
              {tagsArr.map((tag, i) => {
                return (
                  <div key={i} className="tag__item">
                    {tag}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="post__user-row">
            <div className="text__row">
              <div className="user_name">{capitalizeFirstLetter(userName)}</div>
              <div className="user-date">{formattedDate}</div>
            </div>
            <img src={img ? img : userIcon} alt="" />
          </div>
        </div>
      </div>
      <div className="post__body">
        <p>{capitalizeFirstLetter(desc)} </p>
      </div>
    </div>
  );
};

export default Post;
