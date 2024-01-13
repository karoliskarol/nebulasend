import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Get from "api/get";
import UserContext from "contexts/UserContext";

const Auth = ({ children, checkType }) => {
    const navigate = useNavigate();

    const { data, refetch } = useQuery(['checkAuth'], () => Get('/checkAuth/'));

    useEffect(() => {
        if (data !== undefined) {
            if (!data?.auth && checkType) {
                navigate('/');
            }

            if (data?.auth && !checkType) {
                navigate('/mail/inbox');
            }
        }
    }, [data]);

    return (
        <>
            {(data?.auth && checkType) &&
                <UserContext.Provider value={{ ...data.data, email: `${data.data.nick}@nebulasend.com`, refetch }}>
                    {children}
                </UserContext.Provider>
            }
            {(data && !data?.auth && !checkType) && children}
        </>
    );
}

export default Auth;