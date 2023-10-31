import { XMarkIcon } from "@heroicons/react/24/solid";

const Modal = ({ children, heading, id }) => {
    return (
        <>
            <input type="checkbox" id={id} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box max-w-sm modal-bottom sm:modal-middle">
                    <h3 className="text-xl font-bold flex justify-between items-center">
                        <span>{heading}</span>
                        <label htmlFor={id}>
                            <XMarkIcon className="w-6 h-6 cursor-pointer" />
                        </label>
                    </h3>

                    <div className="modal-content">
                        {children}
                    </div>
                </div>
                <label className="modal-backdrop text-blue-900" htmlFor={id}></label>
            </div>
        </>
    );
}

export default Modal;