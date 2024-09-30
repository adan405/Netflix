import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Movie{
    id:number;
    title:string;
    releaseDate:string;
    genre:string;
    description:string;
    image:string;
}

interface MovieState{
    movies:Movie[];
    loading:boolean;
    error:string|null;
}

const initialState:MovieState={
    movies:[],
    loading:false,
    error:null,
}
const MovieSlice=createSlice({
    name:"movies",
    initialState,
    reducers:{
        fetchMoviesStart(state){
            state.loading=true;
            state.error=null;
        },
        fetchMoviesSuccess(state,action:PayloadAction<Movie[]>){
            state.loading=false;
            state.movies=action.payload;
        },
        fetchMoviesFailure(state,action:PayloadAction<string>){
            state.loading=false;
            state.error=action.payload
        },
        addMovie(state,action:PayloadAction<Movie>){
            state.movies.push(action.payload)
        },
    },
})

export const {fetchMoviesStart,fetchMoviesSuccess,fetchMoviesFailure,addMovie}= MovieSlice.actions;
export default MovieSlice.reducer








// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Movie{
//     id:number;
//     title:string;
//     releaseDate:string;
//     genre:string;
//     description:string;
//     image:string;
// }

// interface MovieState{
//     movies:Movie[];
//     loading:boolean;
//     error:string|null;
//     currentPage:number;
//     totalPages:number;
// }

// const initialState:MovieState={
//     movies:[],
//     loading:false,
//     error:null,
//     currentPage:1,
//     totalPages:1,
// }
// const MovieSlice=createSlice({
//     name:"movies",
//     initialState,
//     reducers:{
//         fetchMoviesStart(state){
//             state.loading=true;
//             state.error=null;
//         },
//         fetchMoviesSuccess(state,action:PayloadAction<{movies:Movie[],currentPage:number,totalPages:number}>){
//             state.loading=false;
//             state.movies = action.payload.movies; 
//             state.currentPage=action.payload.currentPage;
//             state.totalPages=action.payload.totalPages;
//         },
//         fetchMoviesFailure(state,action:PayloadAction<string>){
//             state.loading=false;
//             state.error=action.payload
//         },
//         addMovie(state,action:PayloadAction<Movie>){
//             state.movies.push(action.payload)
//         },
//     },
// })

// export const {fetchMoviesStart,fetchMoviesSuccess,fetchMoviesFailure,addMovie}= MovieSlice.actions;
// export default MovieSlice.reducer