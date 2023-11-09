import { XMarkIcon } from "@heroicons/react/24/solid";
import Content from "./Content";

const MobileAside = () => {
    return (
        <div className="drawer z-50 sm:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay bg-red-50 sm:hidden"></label>
                <div className="h-screen bg-gradient-to-tr from-dark-primary to-primary p-6 w-72">
                    <label htmlFor="my-drawer" className="m-auto cursor-pointer flex justify-end items-center">
                        <XMarkIcon className="w-6 h-6 text-light" />
                    </label>

                    <Content type="MOBILE" />
                </div>
            </div>
        </div>
    );
}

export default MobileAside;