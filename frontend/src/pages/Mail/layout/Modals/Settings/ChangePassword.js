import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Put from "../../../../../api/put";
import { passValidation } from "../../../../../utils/yupValidations";
import Alert from "../../../../../components/ui/Alert";

const ChangePassword = () => {
    const { data, isError, mutate, isLoading } = useMutation(['changePassword'], inputs => Put('/settings/changePassword/', inputs));

    const schema = yup.object().shape({
        cpass: yup.string().required(),
        ...passValidation
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
 
    return (
        <form onSubmit={handleSubmit(mutate)}>
            <h3 className="text-lg font-bold">Change password</h3>
            
            { isError && <Alert /> }
            { data && <Alert stat={data.stat} text={data.text} />}

            <div className="mt-0 mb-4">
                <label htmlFor="cpass">Current password</label>
                <input type="password" placeholder="Current password" id="cpass" {...register("cpass")} />
                <p className="text-xs text-red-600 mt-2">{errors?.cpass?.message}</p>
            </div>
            <div className="my-4">
                <label htmlFor="pass">New password</label>
                <input type="password" placeholder="New password" id="pass" {...register("pass")} />
                <p className="text-xs text-red-600 mt-2">{errors?.pass?.message}</p>
            </div>
            <div className="my-4">
                <label htmlFor="rpass">Repeat new password</label>
                <input type="password" placeholder="Repeat new password" id="rpass" {...register("rpass")} />
                <p className="text-xs text-red-600 mt-2">{errors?.rpass?.message}</p>
            </div>
            <button>
                {isLoading && <span className="loading loading-circle text-white w-3 mr-1"></span>}
                Continue
            </button>
        </form>
    );
}

export default ChangePassword;