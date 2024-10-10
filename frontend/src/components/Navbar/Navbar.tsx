import logo from "../../assests/images/logo.png";
import { CgProfile } from "react-icons/cg";
import { FaBell, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); 

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        console.log(token, 'login token ----');
        setIsLogin(!!token);

        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isScrolled]);

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        setIsLogin(false);
        navigate("/signin");
    };
    const handleCategoryClick = (category:string) =>{
        navigate(`/movies/category/${category.toLowerCase()}`);
    }
    return (
        <>
            <div className={`bg-black fixed w-full z-10 transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-transparent'}`}>
                <nav className="px-5 text-white flex justify-between items-center w-full py-3">
                    {/* Left Section */}
                    <div className="flex items-center">
                        <Link to="/home">
                        <img src={logo} alt="Netflix" className="w-24 mr-6 cursor-pointer" /></Link>
                        <ul className="hidden md:flex space-x-5">
                            <li className="cursor-pointer hover:text-gray-300"><Link to="/addmovie">Add Movies</Link></li>
                            <li className="cursor-pointer hover:text-gray-300"><Link to="/allmovie">All Movies</Link></li>
                            
                            {/* Category Dropdown */}
                            <li className="relative">
                                <div
                                    className="cursor-pointer hover:text-gray-300"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    Category
                                </div>
                                {/* Dropdown Items */}
                                {dropdownOpen && (
                                    <ul className="absolute bg-black text-white shadow-lg rounded-md py-2 mt-2 w-40">
                                        <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                                        <button onClick={() => handleCategoryClick('Action')} >Action</button>
                                        </li>
                                        <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                                        <button onClick={() => handleCategoryClick('Comedy')} >Comedy</button>
                                        </li>
                                        <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                                        <button onClick={() => handleCategoryClick('Horror')} >Horror</button>
                                        </li>
                                        <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                                        <button onClick={() => handleCategoryClick('Thrill')} >Thrill</button>
                                        </li>
                                        <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                                        <button onClick={() => handleCategoryClick('Monster')} >Monster</button>
                                        </li>
                                        <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                                        <button onClick={() => handleCategoryClick('Reality')} >Reality</button>
                                        </li>
                                        <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                                        <button onClick={() => handleCategoryClick('Fantasy')} >Fantasy</button>
                                        </li>
                                        <li className="px-4 py-2 hover:bg-gray-800 cursor-pointer">
                                        <button onClick={() => handleCategoryClick('Animation')} >Animation</button>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            <li className="cursor-pointer hover:text-gray-300"><Link to="/yourfavouritemovies">Favorite Movies</Link></li>
                        </ul>
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center space-x-6">
                        <FaSearch className="cursor-pointer hover:text-gray-300" />
                        <FaBell className="cursor-pointer hover:text-gray-300" />
                        <CgProfile className="cursor-pointer hover:text-gray-300" />
                        {/* Mobile Menu Icon */}
                        <div className="md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                            <div className={`${menuOpen ? "hidden" : "block"}`}>
                                <div className="w-6 h-1 bg-white mb-1"></div>
                                <div className="w-6 h-1 bg-white mb-1"></div>
                                <div className="w-6 h-1 bg-white"></div>
                            </div>
                            <div className={`${menuOpen ? "block" : "hidden"}`}>
                                <div className="w-6 h-1 bg-white rotate-45 transform origin-center"></div>
                                <div className="w-6 h-1 bg-white -rotate-45 transform origin-center -mt-1"></div>
                            </div>
                        </div>
                            <button
                                onClick={handleLogout}
                                className="py-2 px-4 bg-red-700 rounded-sm"
                            >
                                Logout
                            </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden bg-black text-white absolute w-full py-5 px-5 space-y-4">
                        <ul>
                            <li className="py-2 border-b border-gray-600 cursor-pointer hover:text-gray-300"><Link to="/addmovie">Add Movies</Link></li>
                            <li className="py-2 border-b border-gray-600 cursor-pointer hover:text-gray-300"><Link to="/allmovie">All Movies</Link></li>
                            <li className="py-2 border-b border-gray-600 cursor-pointer hover:text-gray-300">Category</li>
                            <li className="py-2 border-b border-gray-600 cursor-pointer hover:text-gray-300"><Link to="/yourfavouritemovies">Favorite Movies</Link></li>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default Navbar;
