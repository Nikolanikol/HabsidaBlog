import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../http/index'
import { nanoid } from '@reduxjs/toolkit';




const userSlice = createSlice({
    name : 'user',
    initialState : {
        isLogin : false,
        name : '',
        img : ''
    },
    reducers : {
        setLogin : (state)=>{
             state.isLogin = true
        },
        setLogout : (state)=>{
             state.isLogin = false
        },
        setUserName : (state, action)=>{
            console.log(action.payload, 'payload')
             state.name = action.payload
        },
        setUserImg : (state)=>{
             state.img = false
        },

    },

    
})

export const {setLogin, setLogout,setUserName,setUserImg} = userSlice.actions

export const userReduser = userSlice.reducer