import Header from './Header';
import Welcome from './Welcome';
import About from './About';
import Statistics from './Statistics';
import Footer from './Footer';
import Contacts from './Contacts';
import Auth from '../../components/Auth';

const Home = () => {
    return (
        <Auth checkType={false}>
            <Header />
            <main>
                <Welcome />
                <About />
                <Statistics />
                <Contacts />
            </main>
            <Footer />
        </Auth>
    );
}

export default Home;