import api from "./api";

const Put = async (url, inputs) => {
    return api.put(url, inputs).then(res => res.data);
}
 
export default Put;