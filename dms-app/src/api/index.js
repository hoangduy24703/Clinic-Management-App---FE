import axios from "axios";

const api = axios.create({
  baseURL: "127.0.0.1:8080",
  header: {
    'Content-Type': 'application/json',
  },
});

export default api;