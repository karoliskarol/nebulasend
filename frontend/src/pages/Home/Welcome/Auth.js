import { useState } from "react";
import Login from "./Login";
import Registration from "./Registration";

const Auth = () => {
    const [action, setAction] = useState(0);

    return (!action ?
        <Login setAction={setAction} />
        :
        <Registration setAction={setAction} />
    );
}

export default Auth;