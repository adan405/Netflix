import { useState, useEffect } from "react";
import custom_axios from "../connection/axios";
import { AxiosError } from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";

interface ErrorResponse {
  message: string;
}

interface movieCollection {
  id: number;
  title: string;
  releaseDate: string;
  genre: string;
  description: string;
  image: string;
}

const FavouriteMovies: React.FC = () => {
  const [favouriteMovies, setFavouriteMovies] = useState<movieCollection[]>([]);
  // const user = JSON.parse(localStorage.getItem('user-object')||'')
  // useEffect(()=>{
  //   console.log(user,'---------->>>')
  //   console.log(user.id,"userid----")
  // })
  const token = localStorage.getItem('jwtToken');
  let userId: string | number | null = null;
  if (token) {
    const decodedToken: any = jwtDecode(token);
    userId = decodedToken.sub;
  }
  useEffect(() => {
    const getMovies = async () => {
      try {
        const token = localStorage.getItem("jwtToken")
        //   console.log(token,'token-----')
        if (!token) {
          toast.error("user is not authenticated")
        }
        // console.log(userId, 'userId--------0000')
        const response = await custom_axios.get(`http://localhost:4000/users/${userId}/favourites`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // console.log(response.data, 'resopse.data------------')
        if (response.data) {
          setFavouriteMovies(response.data);
          // console.log(response.data, 'response data==========')
        }
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        toast.error(axiosError.response?.data?.message || 'Failed to fetch movies');
      }
    };

    getMovies();
  }, []);
  console.log(favouriteMovies,'favouriteMovies000000000000----??')
  return (
    <>
      <ToastContainer />
      <div className='AddMovie flex justify-center items-center flex-col'>
        <div className='text-4xl text-white'>
          Your Collection
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-5">
        {
          favouriteMovies.map((movie) => (
            <div className="text-white" key={movie.id}>
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-72 object-cover rounded-md transition-transform duration-300 transform group-hover:scale-110"
              />
              {/* <img src={movie.image} alt="movie" /> */}
              <p>{movie.title}</p>
              <p>{movie.releaseDate}</p>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default FavouriteMovies;
