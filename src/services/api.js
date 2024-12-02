import axios from "axios";

//Base da url
const apiUrl = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
