import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from "react";
import MobileMenu from './MobileMenu';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

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

    const handleShowMenu = () => {
        setShowMenu(prev => !prev);
    }

    return (
        <>
            <header className={`fixed w-full z-50 ${scrolled ? 'text-blue-800 bg-light shadow-xl scrolled' : 'text-white text-opacity-80'}`}>
                <div className="container mx-auto flex justify-between items-center py-6">
                    <div className="flex items-center">
                        <h1 className="font-bold text-3xl text-opacity-70 ml-6 sm:ml-0">
                            <span className="text-1xl">NEBULASEND</span>
                        </h1>
                    </div>
                    <nav className="drop-shadow-2xl hidden sm:flex mr-6 md:mr-0">
                        <ul className="flex items-center gap-5">
                            <li>
                                <a href="#home" className="hover:text-primary">Home</a>
                            </li>
                            <li>
                                <a href="#about">About us</a>
                            </li>
                            <li>
                                <a href="#statistics">Statistics</a>
                            </li>
                            <li>
                                <a href="#contacts">Contacts</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="w-7 h-7 flex sm:hidden mr-6 z-50 cursor-pointer" onClick={() => handleShowMenu()}>
                        { showMenu ? <XMarkIcon /> : <Bars3Icon /> }
                    </div>
                </div>
            </header>
            {showMenu && <MobileMenu handleShowMenu={handleShowMenu} />}
        </>
    );
}

export default Header;