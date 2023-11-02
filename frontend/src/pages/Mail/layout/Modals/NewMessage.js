import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import Post from "../../../../api/post";
import Modal from "../../../../components/ui/Modal";
import Alert from "../../../../components/ui/Alert";

const NewMessage = () => {
    const { data, mutate, isLoading, isError } = useMutation(['newMessage'], inputs => Post('/newMessage/', inputs));

    const schema = yup.object().shape({
        to: yup.string().email('Email must be valid.').required('Email is required field.'),
        subject: yup.string().min(2).max(300).required(),
        message: yup.string().required()
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        if(data?.stat) reset();
    }, [data]);

    return (
        <Modal id="new-message" heading="New message">
            { isError && <Alert /> }
            { data && <Alert stat={data.stat} text={data.text} />}

            <form onSubmit={handleSubmit(mutate)}>
                <div className="mt-0 mb-4">
                    <label id="to">To</label>
                    <input type="text" placeholder="To" id="to" {...register("to")} />
                    <span className="text-xs text-red-600 mt-2">{errors?.to?.message}</span>
                </div>
                <div className="my-4">
                    <label id="subject">Subject</label>
                    <input type="text" placeholder="Subject" id="subject" {...register("subject")} />
                    <span className="text-xs text-red-600 mt-2">{errors?.subject?.message}</span>
                </div>
                <div className="my-4">
                    <label id="message">Message</label>
                    <textarea placeholder="Message" id="Message" {...register("message")}></textarea>
                    <span className="text-xs text-red-600 mt-2">{errors?.message?.message}</span>
                </div>
                <button className="mb-2">
                    {isLoading && <span className="loading loading-circle text-white w-3 mr-1"></span>}
                    Send
                </button>
            </form>
        </Modal>
    );
}

export default NewMessage;