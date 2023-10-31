import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Get from "../../api/get";

const Read = () => {
    const { id } = useParams();

    const { data } = useQuery(['read'], () => Get(`/read/?id=${id}`));

    if (!(data && data.message)) return;

    const blob = new Blob([data.message.message], { type: "text/html" });
    const uri = URL.createObjectURL(blob);

    return (
        <div className="content p-6">
            <div className="h-16 overflow-y-none">
                <h2 className="text-3xl mb-2">{data.message.subject}</h2>
                <div className="text-sm">{data.message.recipient} {`<${data.message.sent_by}>`}</div>
            </div>
            <div className="mt-6 text-slate-800">
                <iframe src={uri} className="email-iframe" sandbox="allow-popups" sameorigin></iframe>
            </div>
        </div>
    );
}

export default Read;