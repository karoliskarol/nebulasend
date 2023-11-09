import { InboxArrowDownIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import MessageContext from "../../../../../contexts/MessageContext";
import { useMutation } from "@tanstack/react-query";
import Put from "../../../../../api/put";
import ConfirmDeletion from "../../Modals/ConfirmDeletion";

const Trash = () => {
    const { message, setMessage, qKey, setCount } = useContext(MessageContext);

    const { data, mutate } = useMutation(['moveTrashBin'], id => Put('/moveTrashBin/', { id: id }).then(() => {
        message.trash = !+message.trash;
        setMessage({ ...message });

        setCount(prev => prev - 1);
    }));

    return (
        <>
            {qKey === 'trash' &&
                <InboxArrowDownIcon
                    className="w-5 h-5 sm:w-4 sm:h-4 text-blue-800 cursor-pointer"
                    onClick={() => mutate(message.id)}
                />
            }
            {qKey !== 'trash' ?
                <TrashIcon
                    className="w-5 h-5 sm:w-4 sm:h-4 text-blue-800 cursor-pointer"
                    onClick={() => mutate(message.id)}
                />
                :
                <>
                    <label htmlFor={`confirm-deletion-${message.id}`} className="cursor-pointer flex items-center">
                        <TrashIcon className="w-5 h-5 sm:w-4 sm:h-4 text-blue-800 cursor-pointer" />
                    </label>
                    <ConfirmDeletion message={message} setMessage={setMessage} setCount={setCount} id={message.id} />
                </>
            }
        </>
    );
}

export default Trash;