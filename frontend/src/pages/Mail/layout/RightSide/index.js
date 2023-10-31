import Header from './Header';

const RightSide = ({ Outlet }) => {
    return (
        <div className="right-side relative w-screen">
            <Header />

            <div className="content">
                {Outlet}
            </div>
        </div>
    );
}

export default RightSide;