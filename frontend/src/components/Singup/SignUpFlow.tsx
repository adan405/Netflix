import React, { useState } from 'react';
import Navbar from './Navbar';
import { ChoosePlans } from "../../utils/Api/PlanApi"
import custom_axios from "../connection/axios";
import { AxiosError } from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
interface ErrorResponse {
    message: string;
}
const SignUpFlow: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedPlan, setSelectedPlan] = useState('');

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePlanSelect = (plan: string) => {
        setSelectedPlan(plan);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password || !selectedPlan) {
            toast.error("Please fill in all required fields.");
            return;
        }
        try {
            const response = await custom_axios.post('auth/register', {
                email,
                password,
                choosePlan: selectedPlan
            });
            toast.success(response.data.message || 'Successfully logged in!');
            if (response.data) {
                navigate("/signin")
            }
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            toast.error(axiosError.response?.data?.message || 'Login failed');
        }
    }


    return (
        <>
            {step === 1 ? (<>
            
                  
                
                    
                <div className="signUp ">
                   <Navbar/>
                    <div className=" flex justify-center items-center mt-16">
                        <div className="text-center text-white">
                        <h1 className="text-6xl font-extrabold">Unlimited movies,</h1>
                        <h1 className="text-6xl font-extrabold">TV shows, and more</h1>
                        <h3 className="text-2xl font-semibold my-2">Starts at Rs 250. Cancel anytime.</h3>
                        <p className="my-2 pt-4 mb-3">Ready to watch? Enter your email to create or restart your membership.</p>
                        <div className="flex justify-center">
                            <input
                                type="text"
                                placeholder="Email Address"
                                className="w-3/4 rounded-sm px-2 bg-black text-white border-2 border-gray-800 outline-none py-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button onClick={handleNextStep} className="py-3 px-3 bg-red-700 font-bold rounded-sm ml-2">
                                GET STARTED
                            </button>
                        </div>
                        </div>
                    </div>
                </div></>
            ) : step === 2 ? (
                <>
                    <Navbar />
                    <div className="flex justify-center items-center mt-5">
                        <div className="w-1/3 bg-white p-8">
                            <span>STEP 1 OF 3</span>
                            <h1 className="text-3xl font-bold">Welcome back!</h1>
                            <h1 className="text-3xl font-bold">Joining Netflix is easy.</h1>
                            <p className="text-xl font-semibold my-2">Enter your password and you'll be watching in no time.</p>
                            <span>Email: </span>
                            <span className="font-semibold text-xl block">{email}</span>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="py-3 px-4 border-2 w-full my-4 rounded-sm"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button onClick={handleNextStep} className="py-4 px-4 border-2 w-full my-4 bg-red-700 text-white block text-center rounded-sm text-xl font-medium">
                                Next
                            </button>
                        </div>
                    </div>
                </>
            ) : step === 3 ? (
                <>
                    <Navbar />
                    <div className="flex justify-center items-center mt-5 ">
                        <div className="w-1/3 bg-white p-8">
                            <span>STEP 2 OF 3</span>
                            <h1 className="text-3xl font-bold text-center">Choose your plan.</h1>
                            <div className="flex items-center mt-4">
                                <p className="flex items-center text-2xl my-2">No commitments, cancel anytime.</p>
                            </div>
                            <div className="flex items-center">
                                <p className="flex items-center text-2xl my-2">Everything on Netflix for one low price.</p>
                            </div>
                            <div className="flex items-center">
                                <p className="flex items-center text-2xl my-2">No ads and no extra fees. Ever.</p>
                            </div>
                            <button onClick={handleNextStep} className="py-4 px-4 border-2 w-full my-4 bg-red-700 text-white block text-center rounded-sm text-xl font-medium">
                                Start Membership
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <Navbar />
                    <div>
                        <div className="p-10">
                            <span>STEP 3 OF 3</span>
                            <h1 className="text-3xl font-bold">Choose your plan.</h1>
                        </div>
                        <div className='flex flex-wrap'>
                            {
                                ChoosePlans.map((item) => (

                                    <div key={item.id} className={`w-80 border-2 rounded-lg pl-4 py-4 mr-2 m-auto cursor-pointer ${selectedPlan === item.device ? 'border-red-500' : ''}`}
                                        onClick={() => handlePlanSelect(item.device)}
                                    >
                                        <div className='w-72 bg-gradient-to-r from-blue-800 to-blue-500 text-white p-2 rounded-lg'>
                                            <h3>{item.device}</h3>
                                            <p className='pb-3'>{item.deviceSize}</p>
                                        </div>
                                        <div className='p-2'>
                                            <p>Monthly prize</p>
                                            <h4 className='pb-3'>Rs. {item.monthlyPrice}</h4>
                                            <hr />
                                        </div>
                                        <div className='p-2'>
                                            <p>Video and sound quality</p>
                                            <h4 className='pb-3'>{item.quality}</h4>
                                            <hr />
                                        </div>
                                        <div className='p-2'>
                                            <p>Resolution</p>
                                            <h4 className='pb-3'>{item.resolution}</h4>
                                            <hr />
                                        </div>
                                        <div className='p-2'>
                                            <p>Supported devices</p>
                                            <h4 className='pb-3'>{item.supportedDevices}</h4>
                                            <hr />
                                        </div>
                                        <div className='p-2'>
                                            <p>Devices your household can watch at the same time</p>
                                            <h4 className='pb-3'>{item.numberOfDevice}</h4>
                                            <hr />
                                        </div>
                                        <div className='p-2'>
                                            <p>Download devices</p>
                                            <h4 className='pb-3'>{item.downloadDevices}</h4>
                                            <hr />
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                        <div className='m-auto w-96'>
                            <form onSubmit={handleSubmit}>
                                <button type="submit" className="py-4 px-4 border-2 w-full my-4 bg-red-700 text-white block text-center text-xl font-medium rounded-md">
                                    Submit
                                </button>
                            </form>
                        </div>

                    </div>
                </>
            )
            }
        </>
    );
}

export default SignUpFlow;
