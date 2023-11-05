import { InboxArrowDownIcon, BookmarkIcon, StarIcon, ArrowUturnRightIcon, EnvelopeIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Link, useNavigate } from "react-router-dom";

const MobileLinks = () => {
    const navigate = useNavigate();

    return (
        <>
            <li className="mt-2 mb-4" onClick={() => navigate('/mail/inbox')}>
                <label htmlFor="my-drawer" className="flex items-center">
                    <InboxArrowDownIcon className="h-4 w-4 mr-3" />
                    Inbox
                </label>
            </li>
            <li className="my-4 flex items-center" onClick={() => navigate('/mail/important')}>
                <label htmlFor="my-drawer" className="flex items-center">
                    <BookmarkIcon className="h-4 w-4 mr-3" />
                    important
                </label>
            </li>
            <li className="my-4 flex items-center" onClick={() => navigate('/mail/starred')}>
                <label htmlFor="my-drawer" className="flex items-center">
                    <StarIcon className="h-4 w-4 mr-3" />
                    Marked with star
                </label>
            </li>
            <li className="my-4 flex items-center" onClick={() => navigate('/mail/sent')}>
                <label htmlFor="my-drawer" className="flex items-center">
                    <ArrowUturnRightIcon className="h-4 w-4 mr-3" />
                    Sent
                </label>
            </li>
            <li className="my-4 flex items-center" onClick={() => navigate('/mail/all')}>
                <label htmlFor="my-drawer" className="flex items-center">
                    <EnvelopeIcon className="h-4 w-4 mr-3" />
                    All emails
                </label>
            </li>
            <li className="my-4 flex items-center" onClick={() => navigate('/mail/trash')}>
                <label htmlFor="my-drawer" className="flex items-center">
                    <TrashIcon className="h-4 w-4 mr-3" />
                    Trash bin
                </label>
            </li>
        </>
    );
}

export default MobileLinks;