import Messages from "./layout/RightSide/Messages";

const Starred = () => {
    return <Messages url="/getMessages/?a=starred" qKey="starred" />;
}

export default Starred;