import { Outlet } from "react-router-dom";
import Auth from "components/Auth";
import Aside from "./layout/Aside";
import RightSide from "./layout/RightSide";
import Modals from "./layout/Modals";

const Mail = () => {
    return (
        <Auth checkType={true}>
            <div className="flex w-screen">
                <Aside />
                <RightSide Outlet={<Outlet />} />
                <Modals />
            </div>
        </Auth>
    );
}

export default Mail;