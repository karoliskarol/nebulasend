import Messages from "./layout/RightSide/Messages";

const Starred = () => {
    return <Messages url="/getMessages/?a=starred" />;
}

export default Starred;