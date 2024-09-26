import { useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/home/Hero';
import ActionMovies from '../components/Movies/ActionMovies';

const Home: React.FC = () => {
    // const user = JSON.parse(localStorage.getItem('user-object')||'')
    // useEffect(()=>{
    //     console.log(user,'---------->>>')
    // })
    return (
        <div>
            <Navbar />
            <Hero />
            <ActionMovies />
        </div>
    )
}

export default Home;