import styles from "./EditProfile.module.scss";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyInput from "../../UI/MyInput/MyInput";
import { getValidate, getValidateEdit } from "../../utils/validate/validate";
import { createUser, editUser } from "../../http";
import { useDispatch } from "react-redux";
import { setLogin } from "../../store/slices/user";

const EditProfile = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        avatarImg : '',
        email : '',
      });
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        avatarImg : '',
        email : '',

      });
      const navigate = useNavigate()
     const dispatch = useDispatch()
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "", // Сбрасывает ошибку при изменении поля
        }));
      };
    
      const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            if (!getValidateEdit(formData,  setErrors)) return
            console.log(formData)
               await editUser(formData)
            //    navigate('/')
        } catch (error) {
            alert('не удалось авторизоваться')
            return
        }

      };
  return (
    <div className={styles.signWrapper}>
      <form onSubmit={handleSubmit} action="">
        <h3>Create new account</h3>
        <MyInput
          value={formData.username}
          placeholder="Username"
          errorText={errors.username}
          handleChange={handleChange}
          name="username"
        />
        <MyInput
          value={formData.email}
          placeholder="Email adress"
          errorText={errors.email}
          handleChange={handleChange}
          name="email"
        />
        <MyInput
          value={formData.password}
          placeholder="Password"
          errorText={errors.password}
          handleChange={handleChange}
          name="password"
          // type='password'
        />
        <MyInput
          value={formData.avatarImg}
          placeholder="Avatar image"
          errorText={errors.avatarImg}
          handleChange={handleChange}
          name="avatarImg"
          // type='password'
        />


        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default EditProfile;
