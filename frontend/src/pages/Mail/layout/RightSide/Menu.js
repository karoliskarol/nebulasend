import { ArrowPathIcon } from "@heroicons/react/24/solid";

const Menu = ({ refetch, isFetching }) => {
    return ( 
        <div className="flex items-center shadow-md h-12 px-4">
            {
                isFetching ? 
                <span className="loading loading-circle text-blue-800 w-5 h-5 mr-1"></span>
                :
                <ArrowPathIcon className="w-5 h-5 text-blue-800 font-bold cursor-pointer" onClick={refetch} />
            }
        </div>
     );
}
 
export default Menu;