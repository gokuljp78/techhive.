import { configureStore } from "@reduxjs/toolkit"
import taskReducer from './slices/taskslice'

const store = configureStore({
    reducer: {
        tasks:taskReducer
    }
});
export default store