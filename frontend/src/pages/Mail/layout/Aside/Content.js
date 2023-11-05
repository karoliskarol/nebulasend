import Links from "./Links";
import MobileLinks from "./MobileLinks";

const Content = ({ type = 'PC' }) => {
    return (
        <>
            <h2 className="my-6 uppercase text-2xl font-bold text-center text-white text-opacity-80">Nebulasend</h2>

            <ul className="text-white text-opacity-60">
                <li className="mt-6 mb-4 flex items-center">
                    <label htmlFor="new-message" className="block w-full">
                        <div className="hover-opacity bg-transparent mb-0 border border-white-100 p-2 rounded-lg text-center cursor-pointer">
                            New message
                        </div>
                    </label>
                </li>
                { type === 'PC' ? <Links /> : <MobileLinks /> }
            </ul>
        </>
    );
}

export default Content;