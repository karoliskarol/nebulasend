import api from "./api";

const Put = async (url, inputs) => {
    return api.put(url, JSON.stringify(inputs)).then(res => res.data);
}
 
export default Put;