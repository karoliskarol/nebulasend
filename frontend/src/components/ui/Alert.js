import { useEffect, useState } from "react";

const Alert = ({ stat = false, text = "Something went wrong.", timeout = 5000 }) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        setTimeout(() => { setShow(false) }, timeout);
    }, []);

    const type = stat ? "alert bg-green-300 text-green-900" : "alert bg-red-300 text-red-900";

    return (
        show &&
        <div className={`${type} mb-4 cursor-pointer`} onClick={() => setShow(false) }>
            <span>{text}</span>
        </div>
    );
}

export default Alert;