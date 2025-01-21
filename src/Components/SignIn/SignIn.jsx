
import React, { useState }from "react";
import styles from "./SignIn.module.scss";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import MyInput from '../../UI/MyInput/MyInput';
import { getValidate } from '../../utils/validate/validate';
import { loginUser } from '../../http';
import { setLogin, setUserImg, setUserName } from '../../store/slices/user';
const SignIn = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!getValidate(formData, setErrors)) return;
      const data = await loginUser(formData);

      navigate("/");
      dispatch(setLogin());
      dispatch(setUserName(data.data.user.username))
      dispatch(setUserImg(data.data.user.image))
    } catch (error) {
      alert("не удалось авторизоваться");
      return;
    }
  };
  return (
    <div className={styles.signWrapper}>
      <form onSubmit={handleSubmit} action="">
        <h3>Sign In</h3>
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


        <button type="submit">Sign in</button>
        <div className={styles.footer}>
          Don`t have an account? <Link to={"/createuser"}>Sign In.</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
