import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import Get from "../../api/get";
import UserContext from "../../contexts/UserContext";

const Read = () => {
    const { id } = useParams();
    const userData = useContext(UserContext);

    const { data } = useQuery(['read'], () => Get(`/read/?id=${id}`));

    if (!(data && data.message)) return;

    const renderSenderReceiver = () => {
        if (userData.email === data.message.sent_by) {
            return `Sent to: ${data.message.sent_to}`;
        } else {
            return `${data.message.recipient} <${data.message.sent_by}>`;
        }
    }

    const blob = new Blob([data.message.message], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    return (
        <div className="flex flex-col w-full h-full p-2 pb-0">
            <div className="mb-4">
                <h2 className="text-3xl mb-2">{data.message.subject}</h2>
                <div className="text-sm">
                    {renderSenderReceiver()}
                </div>
            </div>
            <iframe src={url} className="email-iframe" sandbox="allow-popups"></iframe>
        </div>
    );
}

export default Read;