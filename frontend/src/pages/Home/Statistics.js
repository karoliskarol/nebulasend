import { useQuery } from "@tanstack/react-query";
import Get from "../../api/get";

const Statistics = () => {
    const { data } = useQuery(['getStatistics'], () => Get('/getStatistics/'));
    
    return (data &&
        <section className="statistics py-16 bg-gray-200" id="statistics">
            <div className="container m-auto">
                <h2 className="text-3xl mb-12 font-bold m-auto text-center">Statistics</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    <div className="text-center mb-8 md:mb-0">
                        <h5 className="text-2xl">{data.users}</h5>
                        <div className="text-1xl text-blue-800 font-bold">Users</div>
                    </div>
                    <div className="text-center mb-8 md:mb-0">
                        <h5 className="text-2xl">{data.sent}</h5>
                        <div className="text-1xl text-blue-800 font-bold">Emails sent</div>
                    </div>
                    <div className="text-center mb-8 md:mb-0">
                        <h5 className="text-2xl">{data.received}</h5>
                        <div className="text-1xl text-blue-800 font-bold">Emails received</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Statistics;