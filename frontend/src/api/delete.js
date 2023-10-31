import api from "./api";

const Delete = async url => {
    return api.delete(url).then(res => res.data);
}
 
export default Delete;