import React, { useState } from 'react';
import custom_axios from "../connection/axios";
import axios, { AxiosError } from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Navbar from '../Navbar/Navbar';
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


  //upload movie
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  //handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file)
  }

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !releaseDate || !genre || !description || !image) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append("releaseDate", releaseDate);
    formData.append("genre", genre);
    formData.append("description", description);
    formData.append("image", image);
    if (selectedFile) {
      formData.append("file", selectedFile);
    } else {
      toast.error("Please select a file to upload.");
      return;
    }
    try {
      const response = await axios.post('http://localhost:4000/movies/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const precentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(precentCompleted);
          }
        },
      });
      console.log('file uploaded succeffully=======', response.data.message)
      navigate('/allmovie')
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || 'Movie Adding Failed');
    }
  }
  return (
    <>
      <Navbar />
      <div className='AddMovie flex justify-center items-center flex-col'>

        <div className='text-4xl text-white '>
          Add Your Favourite Movies
        </div>
      </div>
      <div className='px-40 my-20'>
        <form onSubmit={handleFileUpload}>
          <input type="text" placeholder='Enter Title' className='block p-4 w-full outline-none' style={{ border: "2px solid red" }} value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type="text" placeholder='Enter Release Date ' className='block p-4 mt-4 w-full outline-none' style={{ border: "2px solid red" }} value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} />
          <input type="text" placeholder='Enter Genre' className='block p-4 mt-4 w-full outline-none' style={{ border: "2px solid red" }} value={genre} onChange={(e) => setGenre(e.target.value)} />
          <textarea name="" id="" placeholder='Enter Description' className='block p-4 mt-4 w-full resize-none outline-none' style={{ border: "2px solid red" }} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          <input type="text" placeholder='Enter Image Url' className='block p-4 mt-4 w-full outline-none' style={{ border: "2px solid red" }} value={image} onChange={(e) => setImage(e.target.value)} />
          <div>
            <h3 className='text-white'>upload movie</h3>
            <div>
              <input type="file" accept='video/*' onChange={handleFileChange} />

            </div>
            {
              uploadProgress > 0 && (
                <div className='mt-4'>
                  <p className='text-white'>Upload Progress: {uploadProgress}%</p>
                </div>
              )
            }
          </div>
          <button type='submit' className='block p-4 mt-4 w-full text-white' style={{ background: "red" }}>Submit</button>
          <div className='text-white'>
            <button onClick={() => {
              navigate(`/allmovie`)
            }}>NEXT</button>
            <button onClick={handleSignIn}>movie</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default AddMovie;
