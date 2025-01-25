import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../http/index";
import likeIcon from "./like-icon.svg";
import userIcon from "./user-icon.svg";
import MarkdownViewer from "../utils/MarkdownComponent/markdown";
import { format } from "date-fns";
import { setUserName } from "../store/slices/user";
import { capitalizeFirstLetter } from "../utils/capitalize";
import LikeBlock from "../Components/LikeBlock/LikeBlock";


const PostIdPage = () => {
    const dispatch = useDispatch()
  const { slug } = useParams();
  const [data, setData] = useState();
  const [loading, setIsLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const isAuth = useSelector((state) => state.user.isLogin);
  const arcticleAuthor = useSelector((state) => state.user.name);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`/articles/${slug}`)
      .then((res) => setData(res.data.article))
      .then(dispatch(setUserName(localStorage.getItem('username'))))
      .catch((err) => {
        console.log(err);
        alert("Ошибка при получении статьи");
      })
      .finally(() => setIsLoading(false));
  }, []);
  const formattedDate = loading? 
    ""
    : format(new Date(data.createdAt), "MMMM d, yyyy");
  const handleRemoveModal = async (slug) => {
    await axios
      .delete(`/articles/${slug}`)
      .then((data) => alert("Article remooved"))
      .catch((e) => {
        console.log(e);
        alert("Something wrong");
      })
      .finally(navigate("/"));
  };


  return loading ? (
    "loading"
  ) : (
    <div className="post-id-wrapper">
      <div style={{ height: "100%" }} className="post">
        <div className="post__header">
          <div className="post__row">
            <div className="post__title-row">
              <div className="title__row">
                <div className="post__title">{capitalizeFirstLetter(data.slug)}</div>
                <LikeBlock slug={data.slug} isFavorite={data.favorited} likeCount={data.favoritesCount}/>

              </div>
              <div className="tag__row">
                {data.tagList.map((tag, i) => {
                  return (
                    <div key={i} className="tag__item">
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="post__user-row pageid">
              <div style={{display: 'flex'}} className="user-row-header">
                <div className="text__row">
                  <div className="user_name">{capitalizeFirstLetter(data.author.username)}</div>
                  <div className="user-date">{formattedDate}</div>
                </div>
                <img
                  src={data.author.image ? data.author.image : userIcon}
                  alt=""
                />
              </div>
              {data.author.username === arcticleAuthor && isAuth && (
                <div style={{display: 'flex'}} className="btns-row">
                  <button onClick={() => setIsModal(true)} className="red-btn">
                    Delete
                  </button>
                  <button className="green-btn" ><Link to={`/editearticle/${data.slug}`} >Edit</Link></button>
                </div>
              )}

              <div className={isModal ? "delete-modal" : "delete-modal-hide"}>
                <p>Are you sure to delete this article?</p>
                <div className="modal-btn-row">
                  <button
                    onClick={() => setIsModal(false)}
                    className="btn-grey"
                  >
                    No
                  </button>
                  <button
                    onClick={() => handleRemoveModal(slug)}
                    className="btn-blue"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="post__body">
          <p>{data.description} </p>
        </div>
        <div className="mark">
          <MarkdownViewer markdownText={data.body} />
        </div>
      </div>
    </div>
  );
};

export default PostIdPage;
