import "../../assests/style/style.css"
import { FaPlay } from "react-icons/fa6";
import { CiCircleInfo } from "react-icons/ci";

const Hero: React.FC = () => {
    return (
        <>
            <div className="hero_img  ">
                <div className="hero_content text-white px-20">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">Pacific Rim</h1>
                    <p className="w-full sm:w-full md:w-2/3 lg:w-1/2 mb-4 text-sm sm:text-lg md:text-xl">A war ensues when the Kaiju, the monstrous sea creatures, attack human beings. The scientists develop massive robots, Jaegers, to combat them. However, they seem futile against the Kaiju's onslaught.</p>
                    <div className="hero_btns flex">
                        <button className="flex items-center py-2 px-10 bg-white text-black rounded-sm text-lg font-bold mr-3 sm:px-8 md:px-10"><FaPlay className="mr-1 text-2xl" /> Play</button>
                        <button className="flex items-center py-2 px-10 bg-slate-500 text-white rounded-sm text-lg font-bold"><CiCircleInfo className="mr-1 text-2xl font-bold" />More Info</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero;