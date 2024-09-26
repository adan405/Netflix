import { ActionMovie } from "../../utils/Api/Api";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ActionMovies: React.FC = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
        },
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-white my-12 px-12">
                Top Trending Movies
            </h1>
            <div className="px-12">
            <Carousel responsive={responsive} infinite={true}>
                {ActionMovie.map(item => (
                    <div key={item.id} className="p-4">
                        <div className="relative group">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-72 object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                <p className="text-white text-lg font-bold">{item.name}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
            </div>
        </>
    );
};

export default ActionMovies;
