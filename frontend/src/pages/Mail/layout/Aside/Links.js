import { InboxArrowDownIcon, BookmarkIcon, StarIcon, ArrowUturnRightIcon, EnvelopeIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Link } from "react-router-dom";

const Links = () => {
    return (
        <>
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
        </>
    );
}

export default Links;