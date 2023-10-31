import { StarIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Message = ({ message }) => {
    return (
        <div className="block md:flex justify-between py-2 border border-slate-100 email-message">
            <Link to={`/mail/read/${message.id}`} className="flex relative data">
                <div className="w-40 text-sm flex items-center">
                    <input type="checkbox" className="mx-3 w-3 h-3" />
                    <b className="text-slate-800">{message.recipient}</b>
                </div>
                <div className="text-sm left-40 absolute emails-crop">
                    <span className="text-slate-850">{message.subject}</span>
                    <span className="mx-2"> - </span>
                    <span className="text-slate-700">{message.summary}</span>
                </div>
            </Link>
            <div className="flex w-16 justify-around mt-4 md:mt-0">
                <TrashIcon className="w-4 h-4 text-blue-800 cursor-pointer" />
                <StarIcon className={`w-4 h-4 ${message.starred ? 'text-dark-primary' : 'text-blue-800'} cursor-pointer`} />
            </div>
        </div>
    );
}

export default Message;