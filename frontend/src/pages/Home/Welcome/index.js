import Auth from "./Auth";

const Welcome = () => {
    return (
        <section id="home" className="welcome shadow-inner">
            <div className="blue-bg"></div>

            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col text-center align-center mb-8 md:m-auto">
                        <h1 className="text-4xl text-opacity-60 text-white mb-6 mx-auto">Easy, fast, straight to the point</h1>
                        <p className="text-white w-2/3 mx-auto">Nebula send is the all-in-one email solution that helps you send, receive, and manage your emails with ease, and much more.</p>
                    </div>

                    <div className="mx-auto">
                        <Auth />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Welcome;