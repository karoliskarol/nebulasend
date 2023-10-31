import api from "./api";

const Post = async (url, inputs) => {
    return api.post(url, inputs).then(res => res.data);
}
 
export default Post;