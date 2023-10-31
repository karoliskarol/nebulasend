const Contacts = () => {
    return (
        <section className="contacts py-16" id="contacts">
            <div className="container m-auto">
                <h2 className="m-auto text-center text-3xl mb-8 font-bold">Contacts</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 additional-mx">
                    <div className="col-span-2 md:col-span-1 mb-4">
                        <label className="block text-sm font-bold mb-1" htmlFor="fullname"> Fullname </label>
                        <input type="text" placeholder="Fullname" id="fullname" />
                    </div>
                    <div className="col-span-2 md:col-span-1 mb-4">
                        <label className="block text-sm font-bold mb-1" htmlFor="yemail"> Your email </label>
                        <input type="text" placeholder="Your email" id="yemail" />
                    </div>
                    <div className="mb-0 col-span-2">
                        <label className="block text-sm font-bold mb-1" htmlFor="text"> Your text </label>
                        <textarea type="text" placeholder="Your text" id="text"></textarea>
                    </div>
                    <div className="mb-4">
                        <button className="max-w-xs float-none md:float-left">Send</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contacts;