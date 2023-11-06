import { useMutation } from "@tanstack/react-query";
import Put from "../../../../../api/put";
import { StarIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import MessageContext from "../../../../../contexts/MessageContext";

const Star = () => {
    const { message, setMessage, qKey } = useContext(MessageContext);

    const { data, mutate } = useMutation(['changeStarring'], id => Put('/changeStarring/', { id: id }).then(() => {
        message.starred = !message.starred;
        setMessage({ ...message });
    }));

    return (qKey !== 'trash' &&
        <StarIcon
            className={`w-4 h-4 ${message.starred ? 'text-dark-primary' : 'text-blue-800'} cursor-pointer`}
            onClick={() => mutate(message.id)}
        />
    );
}

export default Star;