import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Post from "../../../api/post";
import Alert from "../../../components/ui/Alert";
import { useEffect } from "react";

const Login = ({ setAction }) => {
    const { data, mutate, isLoading, isError } = useMutation(['login'], inputs => Post('/login/', inputs));
    const navigate = useNavigate();

    const schema = yup.object().shape({
        nick: yup.string().required(),
        pass: yup.string().required()
    });

    const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });

    useEffect(() => {
        if(data?.stat) navigate('/mail/inbox');
    }, [data]);

    return (
        <div className="auth-card">
            <h5 className="mb-6 text-lg"> Login </h5>

            { isError && <Alert /> }
            { data && <Alert stat={data.stat} text={data.text} />}

            <form onSubmit={handleSubmit(mutate)}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1" htmlFor="username"> Username </label>
                    <input type="text" placeholder="Nickname" {...register("nick")} />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-1" htmlFor="username"> Password </label>
                    <input type="Password" placeholder="Password" {...register("pass")} />
                </div>
                <button>
                    {isLoading && <span className="loading loading-circle text-white w-3 mr-1"></span>}
                    Login
                </button>
                <div className="text-gray-500 font-thin">
                    Don't have an account? <span className="text-blue-800 cursor-pointer hover-opacity" onClick={() => setAction(1)}>Registration</span>
                </div>
            </form>

        </div>
    );
}

export default Login;