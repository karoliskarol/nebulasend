const MobileMenu = ({ handleShowMenu }) => {
    return (
        <>
            <div className="fixed block sm:hidden z-10 top-0 left-0 w-full h-full bg-black opacity-80 pointer-events-none"></div>
            <div className="bg-light block sm:hidden fixed z-20 w-11/12 p-3 rounded-md m-auto left-1/2 -translate-x-2/4 text-blue-800 mt-24">
                <ul>
                    <li className="my-3">
                        <a href="#home" onClick={handleShowMenu}>Home</a>
                    </li>
                    <li className="my-3">
                        <a href="#about" onClick={handleShowMenu}>About us</a>
                    </li>
                    <li className="my-3">
                        <a href="#statistics" onClick={handleShowMenu}>Statistics</a>
                    </li>
                    <li className="my-3">
                        <a href="#contacts" onClick={handleShowMenu}>Contacts</a>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default MobileMenu;