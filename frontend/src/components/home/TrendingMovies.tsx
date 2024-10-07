import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import custom_axios from "../connection/axios";
import { toast, ToastContainer } from "react-toastify";
import { fetchMoviesFailure, fetchMoviesStart, fetchMoviesSuccess } from "../../Redux/reducers/MovieSlice";
import { useDispatch } from "react-redux";

interface Movie {
    id: number;
    title: string;
    releaseDate: string;
    genre: string;
    description: string;
    image: string;
    movieUrl: string;
}

const TrendingMovies: React.FC = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const moviePerPage = 10;

    useEffect(() => {
        const getMovies = async () => {
            dispatch(fetchMoviesStart());
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    toast.error('User is not authenticated');
                }
                const response = await custom_axios.get(`movies/trendingmovies?limit=${moviePerPage}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTrendingMovies(response.data);
                dispatch(fetchMoviesSuccess(response.data));
            } catch (error: any) {
                dispatch(fetchMoviesFailure(error.message));
                toast.error('Failed to fetch movies');
            }
        };
        getMovies();
    }, [dispatch]);

    const handleMovieClick = (movie: Movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-white my-12 px-12">Top Trending Movies</h1>
            <div className="px-4">
                <Carousel responsive={responsive} infinite={true}>
                    {trendingMovies?.length > 0 ? (
                        trendingMovies.map((movie) => (
                            <div
                                key={movie.id}
                                onClick={() => handleMovieClick(movie)}
                                className="relative group cursor-pointer transition-transform transform hover:scale-105 mx-2" // Added margin to create spacing
                            >
                                {/* Movie Image */}
                                <img
                                    src={movie.image}
                                    alt={movie.title}
                                    className="w-full h-72 object-cover rounded-md"
                                    style={{ maxHeight: "300px" }} // Adjusted max-height
                                />

                                {/* Overlay with Movie Info */}
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 rounded-md">
                                    <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
                                    <p className="text-gray-300 text-sm">{movie.genre}</p>
                                    <p className="text-gray-400 text-xs mt-1">Release Date: {movie.releaseDate}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-white">No movies available</p>
                    )}
                </Carousel>

                {/* Modal for Movie Playback */}
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
        </>
    );
};

export default TrendingMovies;
