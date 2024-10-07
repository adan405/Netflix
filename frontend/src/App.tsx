import './App.css';
import { ToastContainer } from 'react-toastify';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddMovie from './components/Movies/AddMovies'; 
import AllMovies from "./components/Movies/AllMovies";
import ProtectedRoutes from './components/routes/ProtectedRoutes';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import FavouriteMovies from './components/Movies/FavouriteMovies';
import Redirect from './components/routes/Redirect';
import UpdateMovies from './components/Movies/UpdateMovies';
const App: React.FC = () => {
  
  const router = createBrowserRouter([
    { path: "/", element: <Redirect /> },
    { path: "/home", element: <ProtectedRoutes><Home /></ProtectedRoutes> },
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element:<SignUp />},
    { path: "/allmovie", element: <ProtectedRoutes><AllMovies/></ProtectedRoutes> },
    { path: "/addmovie", element: <ProtectedRoutes><AddMovie /></ProtectedRoutes> },
    { path: "/yourfavouritemovies", element: <ProtectedRoutes><FavouriteMovies /></ProtectedRoutes> },
    {path:'updatemovies', element:<UpdateMovies/>}
    // { path: "/addmovie", element: <ProtectedRoutes><AddMovie /> </ProtectedRoutes>},
    // { path: "/allmovie", element: <AllMovies /> },

  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} />
    </>
  );
}

export default App;
