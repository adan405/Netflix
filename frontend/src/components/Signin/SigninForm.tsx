import React, { useState } from "react";
import "../../assests/style/style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import custom_axios from "../connection/axios";
import { AxiosError } from "axios"; 
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { login } from "../../Redux/reducers/UserSlice";

// Define the expected structure of the error response
interface ErrorResponse {
  message: string;
}

const SigninForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await custom_axios.post('auth/login', {
        email,
        password,
      });
      const token = response.data.access_token;
      dispatch(login(token));
      // console.log(token,'signin token----');
      // console.log(response.data,'>>>---')
      localStorage.setItem('jwtToken', token)
      // if(response.data.user){
      //   const user = response.data.user;
      // console.log(user,'->>>>>--')
      //   localStorage.setItem('user-object',JSON.stringify(user))
      // }
      toast.success(response.data.message || 'Successfully logged in!');


      if (response.data) {
        navigate("/home")
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      toast.error(axiosError.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <div className="signIn flex justify-center items-center text-white">
        <div className="w-1/3 bg-black opacity-80" style={{ padding: "48px 68px" }}>
          <h1 className="text-white text-4xl font-bold">Sign In</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email or Mobile Phone"
              className="w-full p-4 bg-black text-white border-2 my-5 rounded-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 bg-black text-white border-2 rounded-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="w-full py-3 px-5 bg-red-700 opacity-100 rounded-sm my-5 text-white font-semibold"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <div className="text-center">
            <a href="/" className="hover:underline">Forget Password</a>
          </div>
          <p className="mt-4 text-gray-400 text-xl">
            New to Netflix? <a href="/signup" className="font-semibold text-white">Sign Up Now</a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SigninForm;



// query builder
//redux only apply entities like user,movie


// pagination
// web sockets