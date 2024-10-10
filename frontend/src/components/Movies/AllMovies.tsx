import custom_axios from "../connection/axios";
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
// import ReactPlayer from 'react-player';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { fetchMoviesFailure, fetchMoviesStart, fetchMoviesSuccess } from "../../Redux/reducers/MovieSlice";

//web sockets
import { io } from "socket.io-client";
import Layout from "../layout/Layout";
interface ErrorResponse {
  message: string;
}

interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  genre: string;
  description: string;
  image: string;
  movieUrl: string;
}

const AllMovies: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state: RootState) => state.movies)
  const [getmovies, setGetmovies] = useState<Movie[]>([]);
  // const [movieCashe, setMovieCashe] = useState<{[key:number]:Movie[]}>({})
  //pagination functionality
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  //web sockets
  useEffect(() => {
    const socket = io('http://localhost:4000');
    socket.on('connect', () => {
      console.log('Connected to WebSocket========');
    },
    );
    socket.on('movieCreated', (newMovie) => {
      setGetmovies((prevMovies) => [...prevMovies, newMovie]);
    })
    socket.on('movieUpdated', (updatedMovie) => {
      setGetmovies(prevMovies => {
        return prevMovies.map(movie =>
          movie.id === updatedMovie.id ? updatedMovie : movie
        );
      });
    });
    socket.on('movieDeleted', (deletedMovieId) => {
      setGetmovies((prevMovies) =>
        prevMovies.filter(movie => movie.id !== deletedMovieId)
      );
    });
    return () => {
      socket.disconnect();
    }
  }, [getmovies])

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    // const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);

  useEffect(() => {
    const getMovies = async () => {
      dispatch(fetchMoviesStart());


      try {
        const token = localStorage.getItem("jwtToken")
        // console.log(token, 'token-----')
        if (!token) {
          toast.error("user is not authenticated");
          return;
        }

        const response = await custom_axios.get(`movies/findAll?page=${currentPage}&limit=${moviesPerPage}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });

        //for pignation
        const newMovies = response.data
        setGetmovies((preMovies) => {
          const allMovies = [...preMovies, ...newMovies];
          const uniqueMovies = allMovies.filter((movie, index, self) => {
            return self.findIndex(m => m.id === movie.id) === index;
          });
          return uniqueMovies;
        })
        dispatch(fetchMoviesSuccess(response.data));

        // if (response.data) {
        //   setGetmovies(response.data);
        // }
      } catch (error: any) {
        // const axiosError = error as AxiosError<ErrorResponse>;
        // toast.error(axiosError.response?.data?.message || 'Failed to fetch movies');
        dispatch(fetchMoviesFailure(error.message));
        toast.error('Failed to fetch movies')
      }
    };
    getMovies();

  }, [dispatch, currentPage]);

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1)
  }

  // const user = JSON.parse(localStorage.getItem('user-object')||'')
  // useEffect(()=>{
  //     console.log(user,'---------->>>')
  //     console.log(user.id,"userid----")
  // })
  //add to favourite

  // Extract userId from JWT
  const token = localStorage.getItem('jwtToken');
  let userId: string | number | null = null;
  if (token) {
    const decodedToken: any = jwtDecode(token);
    userId = decodedToken.sub; // Assuming 'sub' holds the user ID
  }
  const handleAddToFavorites = async (movieId: number) => {
    try {
      // const token = localStorage.getItem('access_token');
      // console.log(movieId)
      // if (!token) {
      //   toast.error("user is not authenticated");
      //   return;
      // }
      // const decodeToken: any = jwtDecode(token);
      // console.log(decodeToken)
      // const userId = decodeToken?.userId;
      // console.log(userId,'userId------');

      // if (!userId) {
      //   toast.error("Invalid token: userId not found");
      //   return;
      // }
      // const userId= user.id
      const response = await axios.post(`http://localhost:4000/users/${userId}/favourite/${movieId}`);
      // console.log(response.data)
      // console.log(movieId, 'movieid------')
      // console.log(userId, 'userid-------')
      toast.success("movie add to favourite")
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || 'Failed to fetch movies');
    }
  }    //search movies by its name

    // const [searchQuery, setSearchQuery] = useState<string>('');
    // const [filterMovies, setFilterMovies] = useState<Movie[]>(movies);

    // useEffect(() => {
    //   if (searchQuery === '') {
    //     setFilterMovies(movies)
    //   }
    //   else {
    //     setFilterMovies(
    //       movies.filter((movie) =>
    //         movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    //       )
    //     )
    //   }
    // }, [searchQuery, movies])
  
    //videoplayer
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)
    const handleMovieClick = (movie: Movie) => {
      console.log(movie, 'movie url----------')
      setSelectedMovie(movie)
      setIsModalOpen(true);
    }
    const closeModal = () => {

      setIsModalOpen(false)
      setSelectedMovie(null)
    }

    return (
      <Layout>
        {loading && <p>Loading....</p>}
        {error && <p>Error: {error}</p>}
        <div className='AddMovie flex justify-center items-center flex-col'>
          <div className='text-4xl text-white'>
            All Your Favourite Movies
          </div>
        </div>
        {/* search movies by its name */}
        <div className="mb-4">
          {/* <input type="text" placeholder="search movies...." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input p-2 border border-gray-300 rounded w-full md:w-1/3" /> */}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-5">
          {getmovies?.length > 0 ? (
            getmovies.map((movie, index) => (
              <div onClick={() => handleMovieClick(movie)} key={`${movie.id}-${index}`} className="relative group cursor-pointer">
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
                  <button className="p-3 bg-red text-white" onClick={() => handleAddToFavorites(movie.id)}>Add to Favourite</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-black text-center col-span-full text-white">No movies available</p>
          )}

          <div className="text-white">

            <button onClick={handleNext} className="w-full py-3 px-5 bg-red-700 opacity-100 rounded-sm my-5 text-white font-semibold">
              Next
            </button>
          </div>


          {isModalOpen && selectedMovie && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
              <div className="relative w-full max-w-4xl">
                <button
                  className=" top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                  onClick={closeModal}
                >
                  X
                </button>
                <video
                  controls
                  className="w-full h-auto"
                  src={selectedMovie.movieUrl}
                  autoPlay
                  onEnded={closeModal}
                />
              </div>
            </div>
          )}
        </div>

        <ToastContainer />
      </Layout>
    );
  };

export default AllMovies;
