// 路径：src/store/index.ts
import { configureStore } from '@reduxjs/toolkit'
import user from './models/user'
import queryReducer from './slices/QuerySlice';
// import { examinationReducer, studentGroupReducer, classifyReducer } from './ExamManages';
import examinationReducer from './ExamManages'

// 创建store
const store =  configureStore({
  reducer: {
    user,
    query: queryReducer,
    examination: examinationReducer,
    // studentGroup: studentGroupReducer,
    // classify: classifyReducer,
  }
})

// 从 store 本身推断出 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>
// 推断出类型: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export default store