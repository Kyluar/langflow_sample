import axios from "axios";

const HOST = "localhost:3001";

const api = axios.create({
    baseURL: `http://${HOST}`,
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;