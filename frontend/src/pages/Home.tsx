import Hero from '../components/home/Hero';
import TrendingMovies from '../components/home/TrendingMovies';
import Layout from '../components/layout/Layout';

const Home: React.FC = () => {
    // const user = JSON.parse(localStorage.getItem('user-object')||'')
    // useEffect(()=>{
    //     console.log(user,'---------->>>')
    // })
    return (
        <div>
            <Layout>
                <Hero />
                <TrendingMovies />
            </Layout>
        </div>
    )
}

export default Home;