import api from "./api";

const Delete = async (url, inputs) => {
    return api.delete(url, { data: JSON.stringify(inputs) }).then(res => res.data);
}
 
export default Delete;