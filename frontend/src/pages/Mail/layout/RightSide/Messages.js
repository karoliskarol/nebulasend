import { useQuery } from "@tanstack/react-query";
import Get from "../../../../api/get";
import Message from "./Message";

const Messages = ({ url }) => {
    const { data } = useQuery([url], () => Get(url));

    return (data?.emailsMessages?.length > 0) && data.emailsMessages.map(message =>
        <Message message={message} key={message.id} />
    );
}

export default Messages;