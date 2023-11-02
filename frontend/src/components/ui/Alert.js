import { useEffect, useState } from "react";
import calculateDisplayTime from "../../utils/calculateDisplayTime";
import { XMarkIcon } from "@heroicons/react/24/solid";
import useAlertProgress from "../../hooks/useAlertProgress";

const Alert = ({ stat = false, text = "Something went wrong.", fixed, timeout }) => {
    const [show, setShow] = useState(true);

    timeout = timeout ? timeout : calculateDisplayTime(text);

    const progress = useAlertProgress(timeout, stat);

    useEffect(() => {
        setTimeout(() => { setShow(false) }, timeout ? timeout : calculateDisplayTime(text));
    }, []);

    const type = stat ? "alert bg-green-300 text-green-900" : "alert bg-red-300 text-red-900";
    return (
        show &&
        <div className={`${type} ${fixed && ' fixed-alert'} my-2 cursor-pointer `} onClick={() => setShow(false)}>
            <XMarkIcon className="block m-auto h-5 w-5" />
            <div>
                {text}
                {progress}
            </div>
        </div>
    );
}

export default Alert;