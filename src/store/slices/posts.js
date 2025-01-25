import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../http/index'
import { nanoid } from '@reduxjs/toolkit';
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ({offset, limit}) => {
    try {
      const {data} = await axios.get('/articles', {
        params: {
          offset: offset, // Номер страницы
          limit: limit, // Количество элементов на странице
        },
      });

      const dataId = data.articles.map(item=>{
        return {...item, id : nanoid()}

      })
      const res = {
        articles : dataId,
        articlesCount : data.articlesCount
      }

      return res; // Возвращаем данные из ответа
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      throw error;
    }
}
    
)

export const deletePost = createAsyncThunk('posts/deletePost', async(id)=>{
    const {data} = await axios.delete(`/posts/${id}`)
    return data
})
const initialState = {
    articles : [
    ]

}

const postsSlice = createSlice({
    name : 'post',
    initialState,
    reducers : {
        setLike : (state, action)=>{
            state.articles.articles.map(item=>{
                if(item.slug === action.payload){
                    return {...item, favorited : !item.favorited}
                }
                return item
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.articles = [];
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.articles = action.payload;
                state.status = 'loaded';
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.status = 'error';
            })
            .addCase(deletePost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.articles = []; // Если нужно удалить только один пост, можно фильтровать items
                state.status = 'loaded';
            })
            .addCase(deletePost.rejected, (state) => {
                state.articles = [];
                state.status = 'error';
            });
    }
    
})

export const {setLike} = postsSlice.actions
export const postsReduser = postsSlice.reducer