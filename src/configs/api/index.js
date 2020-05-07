import baseUrl from "./url";
import ApiRequest from "./config";

const API = {};

// Auth
API.login = ApiRequest.post(baseUrl.auth.login);
API.register = ApiRequest.post(baseUrl.auth.register);

// Blog - POST
API.getPost = ApiRequest.get(baseUrl.blog.post);
API.getUsers = ApiRequest.get(baseUrl.client.users);

export default API;
