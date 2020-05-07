import appConfig from "../appConfig";

export const config = appConfig;

const baseUrl = {
  blog: {
    post: `${config.url.api}/v1/posts`
  },
  client: {
    users: `${config.url.api}/v1/users`
  },
  auth: {
    login: `${config.url.api}/v1/auth/signin`,
    register: `${config.url.api}/v1/auth/signup`
  }
};

export default baseUrl;
