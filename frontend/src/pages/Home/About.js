const About = () => {
    return (
        <section className="about py-16" id="about">
            <div className="container m-auto">
                <div className="m-auto block text-center">
                    <h2 className="text-3xl mb-6 font-bold">About us</h2>
                    <p className="text-gray-800 additional-mx">Nebulasend is an email service designed to save you time and simplify your life. While we may be newcomers in this field, we are dedicated to constant improvement and making your work easier.</p>
                </div>

                <h2 className="m-auto block text-center text-2xl my-8 font-bold">Why choose us?</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-12 text-gray-800 additional-mx">
                    <p>Nebula Send is incredibly user-friendly, allowing you to get started within just a few minutes. Our straightforward interface and intuitive features make it a breeze to send and manage your emails.</p>
                    <p>We are dedicated to providing a continually evolving website to our users, ensuring that they consistently receive fresh and enhanced features, keeping their online experience exciting and up-to-date. Our commitment to regular updates reflects our unwavering dedication to improving user satisfaction.</p>
                    <p>If you encounter any issues, don't hesitate to reach out to our support team. We're here to assist you in resolving any problems you may be experiencing and to address any questions you may have. Your feedback is invaluable to us, as we are committed to providing prompt solutions and delivering informative responses to all your inquiries.</p>
                </div>
            </div>
        </section>
    );
}

export default About;