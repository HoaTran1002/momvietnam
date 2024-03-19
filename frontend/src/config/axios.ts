import axios from "axios";
import base_url, { COOKIE_NAME_ACCESS_TOKEN } from "./env";

import { getCookie } from "@/utils/cookiesStorage";

const server = axios.create({
  baseURL: base_url,
});

server.interceptors.request.use(
  (request) => {
    const jwt = getCookie(COOKIE_NAME_ACCESS_TOKEN);
    // const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWIyNzI0NTI2OWVjNTY5OWE4MzhmNTUiLCJ1c2VyTmFtZSI6Ik1vbUFkbWluIiwiaWF0IjoxNzA5MTc3NTMwLCJleHAiOjE3MDk2MDk1MzB9.iELP1aaxbaitQ-RxlfjLFk1XrwgyEi6NGE1vVEZeYAE";
    if (jwt) {
      request.headers["Authorization"] = `Bearer ${jwt}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

server.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);
export default server;
