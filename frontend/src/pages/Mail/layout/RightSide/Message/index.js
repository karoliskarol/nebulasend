import { Link } from "react-router-dom";
import Star from "./Star";
import Trash from "./Trash";
import { useState } from "react";
import MessageContext from "../../../../../contexts/MessageContext";

const Message = ({ msg, qK, setCount }) => {
    const [message, setMessage] = useState(msg);
    const [qKey, setqKey] = useState(qK);

    return (((qKey !== 'trash' && !message.trash) || (qKey === 'trash' && message.trash)) &&
        <MessageContext.Provider value={{ message, setMessage, qKey, setCount }}>
            <div className="block md:flex justify-between py-2 border border-slate-100 email-message">
                <Link to={`/mail/read/${message.id}`} className="flex relative data">
                    <div className="w-40 text-sm flex items-center">
                        <b className="text-slate-800 mx-2">{message.recipient}</b>
                    </div>
                    <div className="text-sm left-40 absolute emails-crop">
                        <span className="text-slate-850">{message.subject}</span>
                        <span className="mx-2"> - </span>
                        <span className="text-slate-700">{message.summary}</span>
                    </div>
                </Link>
                <div className="flex w-16 justify-evenly items-center mt-4 md:mt-0">
                    <Trash />
                    <Star />
                </div>
            </div>
        </MessageContext.Provider>
    );
}

export default Message;