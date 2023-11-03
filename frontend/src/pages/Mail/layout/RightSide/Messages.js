import { useQuery } from "@tanstack/react-query";
import { FaceFrownIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Menu from "./Menu";
import Get from "../../../../api/get";
import Message from "./Message";

const Messages = ({ url, qKey }) => {
    const [messagesCount, setMessagesCount] = useState(0);

    const { data, isFetching, refetch, error } = useQuery([qKey], () => Get(url), {
        refetchInterval: 10000,
        refetchOnWindowFocus: true,
        pageSize: 10,
        currentPage: 2
    });

    const render = () => {
        if (data?.emailsMessages && messagesCount > 0) {
            return data.emailsMessages.map(message =>
                <Message
                    msg={message}
                    qK={qKey}
                    setCount={setMessagesCount}
                    key={message.id}
                />
            );
        } else if (!isFetching) {
            return <div className="flex justify-center items-center h-full text-gray-500 text-xl">
                <FaceFrownIcon className="w-6 h-6 mr-2" />
                Unfortunataly, there's no messages.
            </div>;
        }
    }

    useEffect(() => {
        if (data?.emailsMessages?.length) {
            setMessagesCount(data.emailsMessages.length);
        }
    }, [data]);

    return (
        <>
            <Menu refetch={refetch} isFetching={isFetching} />
            {!error && render()}
        </>
    );
}

export default Messages;