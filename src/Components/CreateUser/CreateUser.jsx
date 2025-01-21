import React, { useState } from 'react'
import styles from'./CreateUser.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import MyInput from '../../UI/MyInput/MyInput';
import { getValidate } from '../../utils/validate/validate';
import { createUser } from '../../http';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../store/slices/user';

const SignInComponent = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        repeat : '',
        email : '',
      });
    const [checkbox, setCheckbox] = useState(false)
    const [errors, setErrors] = useState({
        username: "",
        password: "",
        repeat : '',
        email : '',
        checkbox : ''
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
            if (!getValidate(formData,  setErrors, checkbox)) return
               await createUser(formData)
               navigate('/')
               dispatch(setLogin())
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
                placeholder='Username'
                errorText={errors.username}
                handleChange={handleChange}
                name='username'
             />
            <MyInput 
                value={formData.email} 
                placeholder='Email adress'
                errorText={errors.email}
                handleChange={handleChange}
                name='email'
             />
            <MyInput 
                value={formData.password} 
                placeholder='Password'
                errorText={errors.password}
                handleChange={handleChange}
                name='password'
                // type='password'

             />
            <MyInput 
                value={formData.repeat} 
                placeholder='  Repeat your password'
                errorText={errors.repeat}
                handleChange={handleChange}
                name='repeat'
                // type='password'
             />


            <hr />

            <div className={styles.checkbox}>
                <input name='checkbox' onChange={()=>setCheckbox(!checkbox)} value={checkbox} checked={checkbox} type="checkbox" id='checkbox'/>
                <label htmlFor="checkbox">I agree to the processing of my personal 
                information</label>

            </div>
            {errors.checkbox?<div style={{color: 'red', display: 'block'}}>"You must agree processing your personal information"</div>
            :
            ''
            }
            <button type='submit'>Create</button>
            <div className={styles.footer}>Already have an account? <Link to={'/signin'}>Sign In.</Link></div>
       </form>
    </div>
  )
}

export default SignInComponent
