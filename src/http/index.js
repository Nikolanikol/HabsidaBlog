import axios from 'axios'
import { useDispatch } from 'react-redux'

const instance = axios.create({
    baseURL: 'https://realworld.habsidev.com/api'
})

instance.interceptors.request.use((config)=>{
    config.headers.Authorization = `Token ${window.localStorage.getItem('token')}`

    return config
})
export default instance

export const createUser = async formData =>{
    const res = await instance.post('/users', {
        user : formData
    })
    const token = res.data.user.token
    localStorage.setItem('token', token)

    return res
}
export const loginUser = async formData =>{
    const res = await instance.post('/users/login', {
        user : formData
    })
    const token = res.data.user.token
    localStorage.setItem('token', token)

    console.log('res',res)
    return res
}
export const editUser = async formData =>{
    const res = await instance.put('/user', {
        ...formData
        
    })
    console.log(res)
    // const token = res.data.user.token
    // localStorage.setItem('token', token)
    return res
}