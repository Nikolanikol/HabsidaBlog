import React, { useState } from "react";
import style from "./CreateArticleComponent.module.scss";
import MyInput from "../../UI/MyInput/MyInput";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getValidate } from "../../utils/validate/validate";
import { createUser } from "../../http";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { number } from "yup";
import axios from '../../http/index'
import { it } from "date-fns/locale";

const CreateArticleComponent = () => {

    // ---------------------
  const { handleSubmit,reset, register, formState :{errors} } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mySubmit = async(data) => {
    const tags = Object.entries(data).filter(([item])=>item.startsWith('tag-')).map(([, value]) => value)
    const res = {
        "article": {
            "title": data.title,
            "description": data.desc,
            "body": data.text,
            "tags": tags
          }
    }
    const responce = await axios.post('/articles',res)
    .then(data=>{
        reset()
        setTags([
            {tag : '', number : Date.now()}
          ])
    })
    .catch(e=>alert('something wrong'))
    .finally(()=>responce)

  };
  const [tags, setTags] = useState([
    {tag : '', number : Date.now()}
  ])
  const addInfo = ()=>{
    setTags([...tags, {tag : '', number : Date.now()}])
  }
  const changeInfo = ( value, number)=>{
    setTags(tags.map(i=> i.number === number ? {...i, tag: value} : i))
  }
  const removeInfo = (number)=>{
    setTags(tags.filter(item=>{
        if(tags.length === 1) return item
        return item.number !== number
  }))
  }
console.log(errors)
  return (
    <div className={style.wrapper}>
      <form onSubmit={handleSubmit(mySubmit)} action="">
        <h3>Create new article</h3>

        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          {...register("title", {
            required: true
          })}
        />
        <div>{errors.title&&<p style={{color: 'red', marginTop: '-20px'}}>Reqiered field</p>}</div>
        <label htmlFor="desc">Short description</label>
        <input

          type="text"
          id="desc"
          placeholder="Description"
          {...register("desc", {
            required : true
          })}
        />
        <div>{errors.desc&&<p style={{color: 'red', marginTop: '-20px'}}>Reqiered field</p>}</div>

        <label htmlFor="text">Text</label>
        <textarea

          type="text"
          id="text"
          placeholder="Text"
          {...register("text", {
            required: true
          })}
        />
        <div>{errors.text&&<p style={{color: 'red', marginTop: '-20px'}}>Reqiered field</p>}</div>

        <div className={style.tagWrapper}>
          <h3>Tags</h3>
          <div className={style.tagBlock}>
            {
              tags.map((tag, i) => {
                return (
                    <div key={i} className={style.buttonRow}>
                        <input
                            type="text"
                            id={`tag-${i}`}
                            placeholder="Tag text"
                            {...register(`tag-${i}`, {
                                required: true
                            })}
                            onChange={(e)=>changeInfo(e.target.value, tag.number)}
                            value={tag.tag}
                        />
                        <div style={{position: 'absolute', bottom : '-20px'}}> {errors[`tag-${i}`]&&<p style={{color: 'red', marginTop: '-20px', }}>Reqiered field</p>}</div>

                        <button
                        type="button"
                        className={style.btnDelete}
                        onClick={()=>removeInfo(tag.number)}
                        >
                        Delete
                        </button>
                        <button
                        className={(i+1) === tags.length? style.btnAdd : style.hide}
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
        <button className={style.btnSubmit} type="submit">Send</button>
      </form>
    </div>
  );
};

export default CreateArticleComponent;
