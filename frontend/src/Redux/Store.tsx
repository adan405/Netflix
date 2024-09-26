import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice';
import MovieSlice from "./reducers/MovieSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        movies:MovieSlice
    },
    devTools: process.env.NODE_ENV !== 'production', 
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
