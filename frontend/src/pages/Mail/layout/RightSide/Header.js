import { MagnifyingGlassIcon, Cog6ToothIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

const Header = () => {
    return (
        <header className="h-14 z-10 text-blue-800 bg-light shadow-sm flex">
            <div className="mx-auto px-6 w-full flex items-center justify-between">
                <form className="relative flex w-2/4">
                    <input type="text" placeholder="Search email" className="bg-slate-200 border-none pr-9" />
                    <MagnifyingGlassIcon className="absolute font-bold w-5 h-5 right-3 top-2/4 -translate-y-1/2" />
                </form>
                <nav className="items-center gap-5 drop-shadow-2xl hidden sm:flex mr-6 md:mr-0">
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