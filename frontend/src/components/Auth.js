import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Get from "../api/get";

const Auth = ({ children, checkType }) => {
    const navigate = useNavigate();

    const { data } = useQuery(['checkAuth'], () => Get('/checkAuth/'));

    useEffect(() => {
        if (data !== undefined) {
            if (!data?.auth && checkType) {
                navigate('/');
                return;
            }

            if (data?.auth && !checkType) {
                navigate('/mail/inbox');
            }
        }
    }, [data]);

    return (children);
}

export default Auth;