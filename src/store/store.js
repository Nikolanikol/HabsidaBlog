import {configureStore} from "@reduxjs/toolkit"
import { postsReduser } from "./slices/posts"
import { userReduser } from "./slices/user"


const store = configureStore({
    reducer : {
        posts : postsReduser,
        user : userReduser
    }
})

export default store