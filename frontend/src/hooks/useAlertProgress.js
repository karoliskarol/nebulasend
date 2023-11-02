import { useEffect, useState } from "react";

const useAlertProgress = (miliseconds, stat) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue(prev => prev + 1);
        }, miliseconds / 100);

        return () => {
            clearInterval(interval);
        }
    }, []);

    return <progress
        className={`progress ${stat ? 'progress-success' : 'progress-error'} w-100 block mt-2`}
        value={value}
        max="100"
    ></progress>;
}

export default useAlertProgress;