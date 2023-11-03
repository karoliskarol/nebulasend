import Messages from "./layout/RightSide/Messages";

const Sent = () => {
    return <Messages url="/getMessages/?a=sent" qKey="sent" />;
}

export default Sent;