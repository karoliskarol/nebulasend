import { useQuery } from "@tanstack/react-query";
import { FaceFrownIcon } from "@heroicons/react/24/solid";
import { useContext, useEffect, useState } from "react";
import Menu from "./Menu";
import Get from "../../../../api/get";
import Message from "./Message";
import RightSideContext from "../../../../contexts/RightSideContext";
import constructUrl from "../../../../utils/constructUrl";

const Messages = ({ qKey }) => {
    const [messagesCount, setMessagesCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const { searchValue } = useContext(RightSideContext);

    const max = 20;

    const { data, isFetching, refetch, error } = useQuery([qKey, currentPage],
        () => Get(constructUrl('/getMessages/', [
            ['a', qKey], ['page', currentPage], ['search', searchValue]
        ])),
        {
            refetchInterval: 10000,
            refetchOnWindowFocus: true,
            keepPreviousData: true
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
        } else if(!isFetching) {
            return <div className="no-messages">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="mb-1" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm5 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                </svg>

                Unfortunataly, there's no messages.
            </div>;
        }
    }

    const handlePagination = bool => {
        if (isFetching || (currentPage * max >= data?.count && bool)) return;

        if (bool) {
            setCurrentPage(prev => prev + 1)
        } else if (!(currentPage <= 1)) {
            setCurrentPage(prev => prev - 1)
        }
    }

    useEffect(() => {
        if (data && data.emailsMessages) {
            setMessagesCount(data.emailsMessages.length);
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [searchValue]);

    return (
        <>
            <Menu
                refetch={refetch}
                isFetching={isFetching}
                page={currentPage}
                handlePagination={handlePagination}
                data={data}
            />
            <div className="mt-12 mb-2">
                {!error && render()}
            </div >
        </>
    );
}

export default Messages;