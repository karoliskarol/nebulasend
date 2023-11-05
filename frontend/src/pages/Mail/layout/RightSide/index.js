import { InboxArrowDownIcon, BookmarkIcon, StarIcon, ArrowUturnRightIcon, EnvelopeIcon, TrashIcon } from '@heroicons/react/24/solid';
import Header from './Header';
import { Link } from "react-router-dom";
import MobileAside from '../Aside/MobileAside';

const RightSide = ({ Outlet }) => {
    return (
        <div className="right-side relative h-screen w-screen">
            <MobileAside />
            <Header />

            <div className="content h-screen">
                {Outlet}
            </div>
        </div>
    );
}

export default RightSide;