import { InboxArrowDownIcon, BookmarkIcon, StarIcon, ArrowUturnRightIcon, EnvelopeIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Link } from "react-router-dom";

const Aside = () => {
    return (
        <aside className="h-screen w-72 p-6 bg-gradient-to-tr from-dark-primary to-primary">
            <h2 className="my-6 uppercase text-2xl font-bold text-center text-white text-opacity-80">Nebulasend</h2>

            <ul className="text-white text-opacity-60">
                <li className="mt-6 mb-4 flex items-center">
                    <label htmlFor="new-message" className="block w-full">
                        <div className="hover-opacity bg-transparent mb-0 border border-white-100 p-2 rounded-lg text-center cursor-pointer">
                            New message
                        </div>
                    </label>
                </li>
                <li className="mt-2 mb-4 flex items-center">
                    <InboxArrowDownIcon className="h-4 w-4 mr-3" />
                    <Link to="/mail/inbox">Inbox</Link>
                </li>
                <li className="my-4 flex items-center">
                    <BookmarkIcon className="h-4 w-4 mr-3" />
                    <Link to="/mail/important">important</Link>
                </li>
                <li className="my-4 flex items-center">
                    <StarIcon className="h-4 w-4 mr-3" />
                    <Link to="/mail/starred">Marked with star</Link>
                </li>
                <li className="my-4 flex items-center">
                    <ArrowUturnRightIcon className="h-4 w-4 mr-3" />
                    <Link to="/mail/sent">Sent</Link>
                </li>
                <li className="my-4 flex items-center">
                    <EnvelopeIcon className="h-4 w-4 mr-3" />
                    <Link to="/mail/all">All emails</Link>
                </li>
                <li className="my-4 flex items-center">
                    <TrashIcon className="h-4 w-4 mr-3" />
                    <Link to="/mail/trash">Trash bin</Link>
                </li>
            </ul>
        </aside>
    );
}

export default Aside;