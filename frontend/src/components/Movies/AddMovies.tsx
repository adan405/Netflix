import React, { useState } from 'react';
import custom_axios from "../connection/axios";
import { AxiosError } from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
interface ErrorResponse {
  message: string;
}
const AddMovie: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("")
  const [releaseDate, setReleaseDate] = useState("")
  const [genre, setGenre] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")


  const [isVisible, setIsVisible] = useState(false);
  // console.log('Rendering movie component');
  const handleSignIn = () => {
    // console.log('mocie button clicked');
    setIsVisible(!isVisible);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !releaseDate || !genre || !description || !image) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {

      const response = await custom_axios.post('movies/add', {
        title,
        releaseDate,
        genre,
        description,
        image
      });
      toast.success(response.data.message || 'Successfully Add Movie!');
      if (response.data) {
        navigate("/allmovie")
      }
      console.log("form submited")
    } catch (error) {

      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || 'Movie Adding Failed');
      // toast.error(error.response.data.message);
    }

  }
  return (
    <>
      <div className='AddMovie flex justify-center items-center flex-col'>

        <div className='text-4xl text-white '>
          Add Your Favourite Movies
        </div>
      </div>
      <div className='px-40 my-20'>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter Title' className='block p-4 w-full outline-none' style={{ border: "2px solid red" }} value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" placeholder='Enter Release Date ' className='block p-4 mt-4 w-full outline-none' style={{ border: "2px solid red" }} value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
          <input type="text" placeholder='Enter Genre' className='block p-4 mt-4 w-full outline-none' style={{ border: "2px solid red" }} value={genre} onChange={(e) => setGenre(e.target.value)} />
          <textarea name="" id="" placeholder='Enter Description' className='block p-4 mt-4 w-full resize-none outline-none' style={{ border: "2px solid red" }} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          <input type="text" placeholder='Enter Image Url' className='block p-4 mt-4 w-full outline-none' style={{ border: "2px solid red" }} value={image} onChange={(e) => setImage(e.target.value)} />
          <button type='submit' className='block p-4 mt-4 w-full text-white' style={{ background: "red" }}>Submit</button>
          <div className='text-white'>
            <button onClick={() => {
              navigate(`/allmovie`)
            }}>NEXT</button>
            <button onClick={handleSignIn}>movie</button>
          </div>
        </form>
      </div>

    </>
  );
}

export default AddMovie;
