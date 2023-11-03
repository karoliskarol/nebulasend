import Messages from "./layout/RightSide/Messages";

const Inbox = () => {
    return <Messages url="/getMessages/" qKey="inbox" />;
}

export default Inbox;