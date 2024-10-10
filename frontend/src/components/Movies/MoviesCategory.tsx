import React, { useEffect, useState } from 'react';
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import custom_axios from '../connection/axios';
import { toast } from 'react-toastify';
import Layout from '../layout/Layout';

interface Movie{
    id: number;
    title: string;
    genre: string;
    releaseDate: string;
    description: string;
    image: string;
}

const MoviesCategory:React.FC  = () =>{
    const navigate = useNavigate();
    const {category} = useParams<{category:string}>();
    const[movies,getMovies] = useState<Movie[]>([])
    useEffect(() => {
        const fetchMovies = async () =>{
          try {
              const response = await custom_axios.get(`movies/category/${category}`);
              getMovies(response.data)
          } catch (error) {
              toast.error("Failed to fetch movies by category");
          }
        };
        fetchMovies();
      }, [category]);
      const handleCategoryClick = (category:string) =>{
        navigate(`/movies/category/${category.toLowerCase()}`);
    }
return(
    <Layout>
    <div className='text-white'>
        <button onClick={() => handleCategoryClick('Action')} className="py-2 px-4 bg-red-700 rounded-sm">Action</button>
        <button onClick={() => handleCategoryClick('Horror')} className="py-2 px-4 bg-red-700 rounded-sm">Horror</button>
        <button onClick={() => handleCategoryClick('Comedy')} className="py-2 px-4 bg-red-700 rounded-sm">Comedy</button>
        <button onClick={() => handleCategoryClick('Thrill')} className="py-2 px-4 bg-red-700 rounded-sm">Thrill</button>
        <button onClick={() => handleCategoryClick('Monster')} className="py-2 px-4 bg-red-700 rounded-sm">Monster</button>
        <button onClick={() => handleCategoryClick('Reality')} className="py-2 px-4 bg-red-700 rounded-sm">Reality</button>
        <button onClick={() => handleCategoryClick('Fantasy')} className="py-2 px-4 bg-red-700 rounded-sm">Fantasy</button>
        <button onClick={() => handleCategoryClick('Animation')} className="py-2 px-4 bg-red-700 rounded-sm">Animation</button>
      </div>
      <div>
        <h2 className="text-white text-4xl">{category} Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-5">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.id} className="relative group cursor-pointer z-0">
                <div className="absolute top-2 left-2 z-10">
                  <button onClick={() => navigate(`/update-movie/${movie.id}`)} className="text-white p-2 bg-gray-700 rounded-full">
                    ✎
                  </button>
                </div>
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-72 object-cover rounded-md transition-transform duration-300 transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-md">
                  <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
                  <p className="text-gray-300 text-sm">{movie.genre}</p>
                  <p className="text-gray-400 text-xs mt-1">Release Date: {movie.releaseDate}</p>

                </div>
              </div>
            ))
          ) : (
            <p className="text-black text-center col-span-full text-white">No movies available</p>
          )}
        </div>
      </div>
    </Layout>
)
}

export default MoviesCategory;