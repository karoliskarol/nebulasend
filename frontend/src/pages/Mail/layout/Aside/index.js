import Content from "./Content";


const Aside = () => {
    return (
        <aside className="h-screen hidden w-72 p-6 bg-gradient-to-tr from-dark-primary to-primary sm:block">
           <Content />
        </aside>
    );
}

export default Aside;