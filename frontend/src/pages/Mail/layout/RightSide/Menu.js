import { ArrowPathIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Menu = ({ refetch, isFetching, page, handlePagination, data }) => {
    const max = 10;

    return (data &&
        <div className="flex fixed w-full bg-light items-center shadow-md h-12 px-4 z-0">
            {
                isFetching ?
                    <span className="loading loading-circle text-blue-800 w-5 h-5 mr-1"></span>
                    :
                    <ArrowPathIcon className="w-5 h-5 text-blue-800 font-bold cursor-pointer" onClick={refetch} />
            }

            { data.count > max &&
                <div className="flex mx-3 items-center">
                    <ChevronLeftIcon className="w-5 h-5 text-blue-800 cursor-pointer" onClick={() => handlePagination(false)} />
                    <div className="text-sm"> Showing {(page - 1) * max} - {page * max < data?.count ? page * max : data.count} / {data?.count} records </div>
                    <ChevronRightIcon className="w-5 h-5 text-blue-800 cursor-pointer" onClick={() => handlePagination(true)} />
                </div>
            }
        </div>
    );
}

export default Menu;