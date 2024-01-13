import Header from './Header';
import MobileAside from '../Aside/MobileAside';
import RightSideContext from "contexts/RightSideContext";
import { useState } from 'react';

const RightSide = ({ Outlet }) => {
    const [searchValue, setSearchValue] = useState('');

    return (
        <RightSideContext.Provider value={{ searchValue, setSearchValue }}>
            <div className="right-side relative h-screen w-screen">
                <MobileAside />
                <Header />

                <div className="content">
                    {Outlet}
                </div>
            </div>
        </RightSideContext.Provider>
    );
}

export default RightSide;