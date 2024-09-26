import logo from "../../assests/images/logo.png"
import { Link } from "react-router-dom";
const Navbar: React.FC = () => {
    return(
        <>
        <div className="flex justify-between items-center py-3 px-10 ">
        <Link to="/" ><img src={logo} alt="netflix" className="w-30" style={{ width: "130px" }} /></Link>
        <Link to="/signin" className="py-2 px-4 bg-red-700 rounded-sm text-white">Sign In</Link>
      </div>
        </>
    )
}

export default Navbar