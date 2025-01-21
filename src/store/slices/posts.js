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
      console.log(data)
      const dataId = data.articles.map(item=>{
        return {...item, id : nanoid()}

      })
      const res = {
        articles : dataId,
        articlesCount : data.articlesCount
      }
      console.log(dataId)
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
        {
            "slug": "sustainable-living-tips-and-tricks",
            "title": "Sustainable Living: Tips and Tricks",
            "description": "Simple ways to reduce your carbon footprint and live sustainably.",
            "body": "Sustainability is more important than ever. This article provides practical tips and tricks to help you live a more sustainable life, from reducing waste to conserving energy.\n\n      One of the easiest ways to start living sustainably is to reduce your use of single-use plastics. Bring reusable bags to the store, use a refillable water bottle, and avoid products with excessive packaging.\n\n      Another important aspect of sustainable living is energy conservation. Turn off lights when you leave a room, unplug devices when they're not in use, and consider investing in energy-efficient appliances.",
            "tagList": [
                "Food",
                "History",
                "Relationships",
                "Self-Improvement",
                "Sports"
            ],
            "createdAt": "2025-01-13T02:57:28.000Z",
            "updatedAt": "2025-01-13T02:57:28.000Z",
            "favorited": false,
            "favoritesCount": 0,
            "author": {
                "username": "bob",
                "bio": "Bob is a data scientist who enjoys analyzing data and building predictive models.",
                "image": "https://randomuser.me/api/portraits/men/2.jpg",
                "following": false
            }
        }
    ]

}

const postsSlice = createSlice({
    name : 'post',
    initialState,
    reducers : {

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


export const postsReduser = postsSlice.reducer