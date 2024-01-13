import { MagnifyingGlassIcon, Cog6ToothIcon, ArrowTopRightOnSquareIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import RightSideContext from 'contexts/RightSideContext';

const Header = () => {
    const { searchValue, setSearchValue } = useContext(RightSideContext);
    const { register, handleSubmit, reset } = useForm();

    const location = useLocation();

    const onSubmit = inputs => {
        setSearchValue(inputs.search);
    }

    const unsetAction = () => {
        reset();

        setSearchValue('');
    }

    useEffect(() => {
        unsetAction();
    }, [location?.pathname]);

    return (
        <header className="main-header h-14 z-20 text-blue-800 bg-light shadow-sm flex relative">
            <div className="mx-auto px-6 w-full flex items-center justify-between">
                <div className="flex sm:hidden z-10">
                    <label htmlFor="my-drawer" className="cursor-pointer flex items-center">
                        <Bars3Icon className="w-6 h-6 text-blue-800" />
                    </label>
                </div>
                <div className="flex items-center w-3/4 sm:w-2/4">
                    {!location.pathname.startsWith('/mail/read/') &&
                        <form className="w-full relative" onSubmit={handleSubmit(onSubmit)}>
                            <input type="text" placeholder="Search email" className="bg-slate-200 border-none pr-9" {...register('search')} />
                            <MagnifyingGlassIcon className="absolute font-bold cursor-pointer w-5 h-5 right-3 top-2/4 -translate-y-1/2" onClick={handleSubmit(onSubmit)} />
                        </form>
                    }
                    {searchValue && <XMarkIcon className="ml-2 w-6 h-6 cursor-pointer" onClick={() => unsetAction()} />}

                </div>
                <nav className="hidden sm:flex items-center gap-5 drop-shadow-2xl mr-6 md:mr-0">
                    <a className="hover:text-primary flex items-center text-sm">
                        <label htmlFor="settings" className="cursor-pointer flex items-center">
                            <Cog6ToothIcon className="w-4 h-4 mr-1" />
                            Settings
                        </label>
                    </a>
                    <a href="#" className="hover:text-primary text-sm cursor-pointer">
                        <label htmlFor="log-out" className="cursor-pointer flex items-center">
                            <ArrowTopRightOnSquareIcon className="w-4 h-4 mr-1" />
                            Log out
                        </label>
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default Header;