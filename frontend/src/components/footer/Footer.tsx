import { Link } from "react-router-dom";
import payments from '../../assests/images/payments.png';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white py-10 px-5 mt-5">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Section 1: Netflix Logo and Description */}
                <div>
                    <h1 className="text-2xl font-bold mb-4">Netflix</h1>
                    <p className="text-gray-400">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni sit, architecto qui corrupti fugit natus provident consequuntur officiis deleniti consectetur facere aut? Atque error ipsum temporibus consectetur, eligendi necessitatibus eum?
                    </p>
                </div>

                {/* Section 2: Quick Links */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li className="hover:text-gray-300">
                            <Link to="/addmovie">Add Movies</Link>
                        </li>
                        <li className="hover:text-gray-300">
                            <Link to="/allmovie">All Movies</Link>
                        </li>
                        <li className="hover:text-gray-300">
                            <Link to="/yourfavouritemovies">Favorite Movies</Link>
                        </li>
                    </ul>
                </div>

                {/* Section 3: Policies */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Policies</h2>
                    <ul className="space-y-2">
                        <li className="hover:text-gray-300">
                            <Link to="/">Privacy Policy</Link>
                        </li>
                        <li className="hover:text-gray-300">
                            <Link to="/">Terms & Conditions</Link>
                        </li>
                    </ul>
                </div>

                {/* Section 4: Payment Methods */}
                <div className="flex items-center justify-center">
                    <img src={payments} alt="Payments" className="w-60" />
                </div>
            </div>

            {/* Responsive Layout: Text Below on Small Screens */}
            <div className="mt-8 text-center text-gray-500 text-sm ">
                © 2024 Netflix. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
