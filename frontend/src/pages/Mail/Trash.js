import Messages from "./layout/RightSide/Messages";

const Trash = () => {
    return <Messages url="/getMessages/?a=trash" qKey="trash" />;
}

export default Trash;