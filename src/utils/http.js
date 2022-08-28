import axios from "axios";

const instance = axios.create({
  baseURL: "https://placeofkindness-server.herokuapp.com/api",
});

export default instance;
