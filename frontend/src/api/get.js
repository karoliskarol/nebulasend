import api from "./api";

const Get = async url => {
    return api.get(url).then(res => res.data);
}
 
export default Get;