import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer';
import Navbar from '../Navbar/Navbar';

interface ErrorResponse {
    message: string;
}

const UpdateMovie: React.FC = () => {
    const navigate = useNavigate();
    const [movieId, setMovieId] = useState<number | string>(''); // ID to fetch movie
    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);  

    
    const fetchMovieById = async (id: number | string) => {
        try {
            const response = await axios.get(`http://localhost:4000/movies/find/${id}`); 
            const movieData = response.data;
            setTitle(movieData.title);
            setReleaseDate(movieData.releaseDate);
            setGenre(movieData.genre);
            setDescription(movieData.description);
            setImage(movieData.image);
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            toast.error(axiosError.response?.data?.message || 'Failed to fetch movie');
        }
    };

    // Handle update movie submission
    const handleMovieUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title || !releaseDate || !genre || !description) {
            toast.error("Please fill in all required fields.");
            return;
        }

       
        const formData = new FormData();
        formData.append('title', title);
        formData.append('releaseDate', releaseDate);
        formData.append('genre', genre);
        formData.append('description', description);
        formData.append('image', image);  
        if (selectedFile) {
            formData.append('file', selectedFile); 
        }

        try {
            await axios.patch(`http://localhost:4000/movies/update/${movieId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Movie updated successfully');
            navigate('/allmovie');
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            toast.error(axiosError.response?.data?.message || 'Failed to update movie');
        }
    };


    const handleFetchMovie = () => {
        if (movieId) {
            fetchMovieById(movieId);
        } else {
            toast.error("Please enter a valid movie ID.");
        }
    };

    return (
        <>
            <Navbar />
            <div className='UpdateMovie flex justify-center items-center flex-col'>
                <div className='text-4xl text-white'>
                    Update Movie
                </div>
            </div>
            <div className='px-40 my-20'>
               
                <input
                    type="number"
                    placeholder='Enter Movie ID to Fetch'
                    className='block p-4 w-full outline-none'
                    style={{ border: "2px solid red" }}
                    value={movieId}
                    onChange={(e) => setMovieId(e.target.value)}
                />
                <button className='block p-4 mt-4 w-full text-white' style={{ background: "red" }} onClick={handleFetchMovie}>
                    Fetch Movie
                </button>

                <form onSubmit={handleMovieUpdate}>
                    <input
                        type="text"
                        placeholder='Enter Title'
                        className='block p-4 w-full outline-none'
                        style={{ border: "2px solid red" }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Enter Release Date '
                        className='block p-4 mt-4 w-full outline-none'
                        style={{ border: "2px solid red" }}
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder='Enter Genre'
                        className='block p-4 mt-4 w-full outline-none'
                        style={{ border: "2px solid red" }}
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                    />
                    <textarea
                        name=""
                        id=""
                        placeholder='Enter Description'
                        className='block p-4 mt-4 w-full resize-none outline-none'
                        style={{ border: "2px solid red" }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <input
                        type="text"
                        placeholder='Enter Image Url'
                        className='block p-4 mt-4 w-full outline-none'
                        style={{ border: "2px solid red" }}
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    {/* File input for movie file upload */}
                    <input
                        type="file"
                        className='block p-4 mt-4 w-full outline-none'
                        style={{ border: "2px solid red" }}
                        onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                    />

                    <button type='submit' className='block p-4 mt-4 w-full text-white' style={{ background: "red" }}>
                        Update Movie
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default UpdateMovie;
