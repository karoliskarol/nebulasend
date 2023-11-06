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

    const max = 10;

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
        } else if (!isFetching) {
            return <div className="flex justify-center items-center h-full text-gray-500 text-xl">
                <FaceFrownIcon className="w-6 h-6 mr-2" />
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
        if (data?.emailsMessages?.length) {
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
            <div className="mt-14 mb-2">
            {!error && render()}
            </div>
        </>
    );
}

export default Messages;