import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",  
  header: {
    'Content-Type': 'application/json',
  },
});

export default api;