import React, { useEffect } from 'react'
import './HeaderComponent.css'
import userIcon from './user-icon.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin, setLogout } from '../../store/slices/user'
const HeaderComponent = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLogin = useSelector(state=>{
        return state.user.isLogin
    })
    const userName = useSelector(state=>state.user.name)
    const userImg = useSelector(state=>state.user.img)
    const handleLogout = ()=>{
        dispatch(setLogout())
        navigate('/')
        localStorage.removeItem('token')
    }
    useEffect(()=>{
        if(localStorage.getItem('token')){
            dispatch(setLogin())
            
        }
    },[])
  return (
    <div className='header'>
        <div className="header__row">
            <Link to={'/'}>Realworld Blog</Link>
            <div className="button__row">
                {
                    isLogin?
                    <div className="isLogin">
                        <a href='#' className="create">Create article</a>
                        <a href='#' className="user">
                            <span>{userName}</span>
                            <img src={userImg? userImg: userIcon} alt="" />
                        </a>
                    </div>
                    :
                    <Link to={'/signin'} href="#" className='signin'>Sign in</Link>
                }
                {
                    isLogin?
                    <a  href='#' className='signup' onClick={()=>handleLogout()}>LogOut</a>
                    :
                    <Link to={'/createuser'}  className='signup'>Sign Up</Link>

                }
            </div>
        </div>
    </div>
  )
}

export default HeaderComponent
