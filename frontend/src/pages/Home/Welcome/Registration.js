import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from '@tanstack/react-query';
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../../../api/post";
import Alert from "../../../components/ui/Alert";

const Registration = ({ setAction }) => {
    const [captcha, setCaptcha] = useState(null);

    const { data, mutate, isLoading, isError } = useMutation(['registration'], inputs => Post('/registration/', inputs));
    const navigate = useNavigate();

    const schema = yup.object().shape({
        nick: yup.string().min(3).max(30)
            .matches(/^[0-9aA-zZ\s]+$/, "Nick can't contain any special characters")
            .required(),

        pass: yup.string().min(8).max(30)
            .matches(/[0-9]/, 'Need atleast one number')
            .matches(/[A-Z]/, 'Need atleast one uppercase letter')
            .matches(/[^a-zA-Z0-9]/, 'Need atleast one special character')
            .required(),

        rpass: yup.string().oneOf([yup.ref("pass"), null], "Passwords don't match").required()
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = inputs => {
        inputs['g-recaptcha-response'] = captcha;

        mutate(inputs);
    }

    if(data?.stat) navigate('/mail/inbox');

    return (
        <div className="auth-card">
            <h5 className="mb-6 text-lg"> Registration </h5>

            { isError && <Alert /> }
            { data && <Alert stat={data.stat} text={data.text} />}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1" htmlFor="nick"> Username </label>
                    <input
                        type="text"
                        placeholder="Username"
                        id="nick" {...register("nick")}
                    />
                    <p className="text-xs text-red-600 mt-2">{errors?.nick?.message}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1" htmlFor="pass"> Password </label>
                    <input
                        type="Password"
                        placeholder="Password"
                        id="pass" {...register("pass")}
                    />
                    <p className="text-xs text-red-600 mt-2">{errors?.pass?.message}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1" htmlFor="rpass"> Repeat password </label>
                    <input
                        type="Password"
                        placeholder="Repeat assword"
                        id="rpass"
                        {...register("rpass")}
                    />
                    <p className="text-xs text-red-600 mt-2">{errors?.rpass?.message}</p>
                </div>
                <div className="mb-4 w-50 recaptcha">
                    <ReCAPTCHA sitekey="6LcqlrYoAAAAAJTzYv8vmwG7RXepK2F1IOppKZh3" onChange={str => setCaptcha(str)} />
                </div>

                <button>
                    {isLoading && <span className="loading loading-spinner text-white w-3 mr-1"></span>}
                    Registration
                </button>
                <div className="text-gray-500 font-thin">Have an account? <span className="text-blue-800  cursor-pointer hover-opacity" onClick={() => setAction(0)}>Login</span> </div>
            </form>

        </div>
    );
}

export default Registration;