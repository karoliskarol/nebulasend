import { useEffect, useState } from "react";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);

    const handleScroll = () => {
        const scrollTop = window.scrollY;

        if (scrollTop > 0) {
            if (!scrolled) {
                setScrolled(true);
            }
        } else {
            if (scrolled) {
                setScrolled(false);
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    });

    return (
        <header className={`fixed w-full z-10 ${scrolled ? 'text-blue-800 bg-light shadow-xl scrolled' : 'text-white text-opacity-80'}`}>
            <div className="container mx-auto flex justify-between items-center py-6">
                <div className="flex items-center">
                    <h1 className="font-bold text-3xl text-opacity-70 ml-6 sm:ml-0">
                        <span className="text-1xl">NEBULASEND</span>
                    </h1>
                </div>
                <nav className="items-center gap-5 drop-shadow-2xl hidden sm:flex mr-6 md:mr-0">
                    <a href="#home" className="hover:text-primary">Home</a>
                    <a href="#about">About us</a>
                    <a href="#statistics">Statistics</a>
                    <a href="#contacts">Contacts</a>
                </nav>
                <svg  className="w-7 h-7 flex sm:hidden mr-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
        </header>

    );
}

export default Header;