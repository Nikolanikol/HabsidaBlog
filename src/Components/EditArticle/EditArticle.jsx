import React, { useEffect, useState } from "react";
import style from "./EditArticle.module.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import axios from "../../http/index";
import { da } from "date-fns/locale";
import { nanoid } from "nanoid";
const EditArticle = () => {
  const { slug } = useParams();
    const navigate = useNavigate()
  useEffect(() => {
    const res = axios
      .get(`/articles/${slug}`)
      .then(({ data }) => {

        setFormData({
          title: data.article.title,
          desc: data.article.description,
          text: data.article.body,
        });
        setTags(() => {
          if (data.article.tagList.length === 0) {
            return [{ tag: "", number: Date.now() }];
          }
          return data.article.tagList.map((tag) => {
            return {
              tag,
              number: nanoid(),
            };
          });
        });
      })
      .catch((e) => console.log(e));
  }, []);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    text: "",
  });
  const changeFormData = (key, value) => {
    setFormData((state) => ({
      ...state,
      [key]: value,
    }));

  };

  // ---------------------
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const mySubmit = async (data) => {
    const tags = Object.entries(data)
      .filter(([item]) => item.startsWith("tag-"))
      .map(([, value]) => value);
    const res = {
      article: {
        title: formData.title,
        description: formData.desc,
        body: formData.text,
        tags: tags,
      },
    };
    console.log("res", res);
    await axios
      .put(`/articles/${slug}`, res)
      .then((data) => {
        setFormData({
          title: "",
          desc: "",
          text: "",
        });
        setTags([{ tag: "", number: Date.now() }]);
        
        alert("Post updated");
      })
      .catch((e) => alert("something wrong"))
      .finally(navigate(`/post/${slug}`));
  };
  const [tags, setTags] = useState([{ tag: "", number: Date.now() }]);
  const addInfo = () => {
    setTags([...tags, { tag: "", number: Date.now() }]);
  };
  const changeInfo = (value, number) => {
    setTags(tags.map((i) => (i.number === number ? { ...i, tag: value } : i)));
  };
  const removeInfo = (number) => {
    setTags(
      tags.filter((item) => {
        if (tags.length === 1) return item;
        return item.number !== number;
      })
    );
  };

  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit(mySubmit)} action="">
        <h3>Create new article</h3>

        <label htmlFor="title">Title</label>
        <input
          value={formData.title}
          onChange={(e) => changeFormData("title", e.target.value)}
          type="text"
          id="title"
          placeholder="Title"
        />
        <div>
          {errors.title && (
            <p style={{ color: "red", marginTop: "-20px" }}>Reqiered field</p>
          )}
        </div>
        <label htmlFor="desc">Short description</label>
        <input
          value={formData.desc}
          onChange={(e) => changeFormData("desc", e.target.value)}
          type="text"
          id="desc"
          placeholder="Description"
        />
        <div>
          {errors.desc && (
            <p style={{ color: "red", marginTop: "-20px" }}>Reqiered field</p>
          )}
        </div>

        <label htmlFor="text">Text</label>
        <textarea
          value={formData.text}
          onChange={(e) => changeFormData("text", e.target.value)}
          type="text"
          id="text"
          placeholder="Text"
        />
        <div>
          {errors.text && (
            <p style={{ color: "red", marginTop: "-20px" }}>Reqiered field</p>
          )}
        </div>

        <div className={style.tagWrapper}>
          <h3>Tags</h3>
          <div className={style.tagBlock}>
            {tags.map((tag, i) => {
              return (
                <div key={i} className={style.buttonRow}>
                  <input
                    type="text"
                    id={`tag-${i}`}
                    placeholder="Tag text"
                    {...register(`tag-${i}`, {
                      required: true,
                    })}
                    onChange={(e) => changeInfo(e.target.value, tag.number)}
                    value={tag.tag}
                  />
                  <div style={{ position: "absolute", bottom: "-20px" }}>
                    {" "}
                    {errors[`tag-${i}`] && (
                      <p style={{ color: "red", marginTop: "-20px" }}>
                        Reqiered field
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    className={style.btnDelete}
                    onClick={() => removeInfo(tag.number)}
                  >
                    Delete
                  </button>
                  <button
                    className={
                      i + 1 === tags.length ? style.btnAdd : style.hide
                    }
                    type="button"
                    onClick={addInfo}
                  >
                    Add tag
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <button className={style.btnSubmit} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
