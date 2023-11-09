import { useMutation } from "@tanstack/react-query";
import Modal from "../../../../components/ui/Modal";
import Delete from "../../../../api/delete";

const ConfirmDeletion = ({ id, message, setMessage, setCount }) => {
    const { data, isLoading, mutate } = useMutation(['deleteMessage'], id => Delete('/deleteMessage/', { id: id }).then(() => {
        message.trash = !message.trash;
        setMessage({ ...message });

        setCount(prev => prev - 1);
    }));

    return (
        <Modal id={`confirm-deletion-${id}`} heading="Confirm deletion">
            <p>Do you really want to delete this message?</p>
            <div className="flex mt-4">
                <label className="text-blue-900 w-1/2 h-10 mb-0" htmlFor={`confirm-deletion-${id}`}>
                    <div className="button text-center uppercase cursor-pointer">Cancel</div>
                </label>
                <button className="bg-red-600 w-1/2 ml-2 mb-0 h-10 uppercase" onClick={() => mutate(id)}>
                    {isLoading && <span className="loading loading-circle text-white w-3 mr-1"></span>}
                    Delete
                </button>
            </div>
        </Modal>
    );
}

export default ConfirmDeletion;